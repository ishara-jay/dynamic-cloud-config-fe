import { configureStore } from '@reduxjs/toolkit';
import ProviderSettingsReducer from './providerSettingsSlice';
import ConfigurationReducer from './configurationSlice';
import FormErrorReducer from './formErrorSlice';
import { enableMapSet } from 'immer'

enableMapSet();

export const store = configureStore({
  reducer: {
    providerSettings: ProviderSettingsReducer,
    configuration: ConfigurationReducer,
    formErrors: FormErrorReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch