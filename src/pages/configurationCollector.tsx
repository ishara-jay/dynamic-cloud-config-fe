import React, { useEffect, useState } from "react";
import ProviderSelector from "../components/provider-selector";
import DynamicForm from "../components/form-generator";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IProvider, IProviderSettings } from "../types/store/storeTypes";
import { getProviderSettings } from "../api/getProviderSettings";
import { addProviders } from "../store/providerSettingsSlice";
import { IFormError, IInputConfigs } from "../types/formTypes";
import { validateDropdown, validateWithRegex } from "../validators/formValidator";
import { addParams, changeCloudProvider, resetParams } from "../store/configurationSlice";
import Snackbar from '@mui/material/Snackbar';
import { postConfig } from "../api/postConfiguration";
import { IConfigSaveResponse } from "../types/apiTypes";
import { addError, removeError } from "../store/formErrorSlice";


export default function ConfigurationCollector () {

    const providerSettings = useSelector((state: RootState) => state.providerSettings);
    const configurations = useSelector((state: RootState) => state.configuration);
    const formErrors = useSelector((state: RootState) => state.formErrors);
    const dispatch = useDispatch();

    const [selectedProviderSettings, setSelectedProviderSettings] = useState<IProvider>();
    const [currenProviderArr, setCurrentProviderArr] = useState<IInputConfigs[]>([]);
    const [errorMap, setErrorMap] = useState<Map<string, IFormError>>(new Map())
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage]  = useState<string>();


    useEffect(() => {
        getProviderSettings().then((response: IProviderSettings) => {
            dispatch(addProviders(response.providers))
        })
    }, [])

    useEffect(() => {
        const settings: IProvider | undefined = providerSettings.providers.find(
            p => p.name === providerSettings.selectedProvider
        );
        settings && setSelectedProviderSettings(settings);
        settings && setCurrentProviderArr(settings?.fields)
        dispatch(changeCloudProvider(providerSettings.selectedProvider));
    }, [providerSettings]);

    useEffect(() => {
        if(selectedProviderSettings) {
            let latestFields = JSON.parse(JSON.stringify(currenProviderArr));

            currenProviderArr.forEach((config: IInputConfigs) => {

                let currentConfig: IInputConfigs = JSON.parse(JSON.stringify(config));

                if (currentConfig.type === "DROPDOWN") {
                    currentConfig.onChange = (e: string) => {
                        currentConfig.error = !validateDropdown(e, currentConfig.possibleValues ? currentConfig.possibleValues : []);
                        if (!currentConfig.error) {
                            dispatch(addParams({
                                paramType: "DROPDOWN",
                                paramKey: currentConfig.label,
                                paramValue: e
                            }));
                            // errorMap.delete(currentConfig.label);
                            // setErrorMap(errorMap);
                            dispatch(removeError({
                                key: currentConfig.label
                            }));
                        } else {
                            // errorMap.set(currentConfig.label, {
                            //     error: true,
                            //     message:`${currentConfig.label} does not hold a valid option for this value`
                            // })
                            dispatch(addError({
                                key: currentConfig.label,
                                value: {
                                    error: true,
                                    message:`${currentConfig.label} does not hold a valid option for this value`
                                }
                            }))
                            // setErrorMap(errorMap);
                        }
                    }
                } else {
                    currentConfig.onChange = (e: any) => {
                        console.log(e.target.value, " : val for text")
                        currentConfig.error = !validateWithRegex(e.target.value, config.regex);
                        if (!currentConfig.error ) {
                            dispatch(addParams({
                                paramType: currentConfig.type,
                                paramKey: currentConfig.label,
                                paramValue: e.target.value
                            }));
                            // errorMap.delete(currentConfig.label);
                            dispatch(removeError({
                                key: currentConfig.label
                            }));
                        } else {
                            // errorMap.set(currentConfig.label, {
                            //     error: true,
                            //     message:`${currentConfig.label} does not supports this value`
                            // })
                            dispatch(addError({
                                key: currentConfig.label,
                                value: {
                                    error: true,
                                    message:`${currentConfig.label} does not supports this value`
                                }
                            }))
                            // setErrorMap(errorMap);
                        }
                    }
                }
                // if(formErrors.errors.get(currentConfig.label)) {
                //     currentConfig.error = errorMap.get(currentConfig.label)?.error
                //     currentConfig.errorString = errorMap.get(currentConfig.label)?.message
                // }
                
                latestFields = latestFields.map((ps: IInputConfigs)  => {
                    if(ps.label === currentConfig.label)
                        return currentConfig;
                    return ps;
                });
            });

            setCurrentProviderArr(latestFields);
        }
    },[currenProviderArr]);

    useEffect(() => {
        if (currenProviderArr) {
            let latestFields = JSON.parse(JSON.stringify(currenProviderArr));

            currenProviderArr.forEach((config: IInputConfigs) => {
                let currentConfig: IInputConfigs = JSON.parse(JSON.stringify(config));
                let err = formErrors.errors[currentConfig.label];
                if(err) {
                    currentConfig.error = formErrors.errors[currentConfig.label].error
                    currentConfig.errorString = formErrors.errors[currentConfig.label].message
                } else {
                    currentConfig.error = false;
                }
                
                latestFields = latestFields.map((ps: IInputConfigs)  => {
                    if(ps.label === currentConfig.label)
                        return currentConfig;
                    return ps;
                });
            })
            setCurrentProviderArr(latestFields);
        }
    },[formErrors])

    const onSubmit = async () => {
        let validated : boolean = !Object.keys(formErrors.errors).every((key) => formErrors.errors[key] && formErrors.errors[key].error);
        if (validated) {
            let response : IConfigSaveResponse = await postConfig(configurations);
            if (response.recordId) {
                setMessage(`Configurations Updated Successfully for ${response.cloudProvider}`)
            }  else {
                setMessage(`Couldn't update the configs for ${response.cloudProvider}`)
            }
        } else {
            setMessage(`Validation failed for the configs. Please check again`);
        }
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
            setMessage("");
        },5000)
    }

    return (
        <>
        <Grid container spacing={2}>
            <Grid item xs={12}/>
            <Grid item xs={4}>
                <ProviderSelector/>
            </Grid>
            <Grid item xs={6}>
                <DynamicForm
                    inputConfig={currenProviderArr}
                />
                <Button id="submit-button" onClick={onSubmit}>SUBMIT</Button>
            </Grid>

            <Grid item xs={2}/>
        </Grid>
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={open}
            message={message}
            key={"top-right-snackbar"}
        />
        </>
    );
}