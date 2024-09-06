import { configureStore } from "@reduxjs/toolkit";
import catalogueReducer from "./catalogueSlice";
import studyPlanReducer from "./studyPlanSlice"


export default configureStore({
    reducer:{
        catalogue: catalogueReducer,
        studyPlan: studyPlanReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
          immutableCheck: false,
        }),
})