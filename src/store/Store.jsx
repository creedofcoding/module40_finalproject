import { configureStore } from '@reduxjs/toolkit';
import AuthSlicer from './Slicers/AuthSlicer';
import UserInfoSlicer from './Slicers/UserInfoSlicer';
import HistogramsSlicer from './Slicers/HistogramsSlicer';
import ObjectSearchSlicer from './Slicers/ObjectSearchSlicer';
import DocumnetsSlicer from './Slicers/DocumentsSlicer'


export default configureStore({
    reducer: {
        login: AuthSlicer,
        userInfo: UserInfoSlicer,
        histograms: HistogramsSlicer,
        objectsearch: ObjectSearchSlicer,
        documents: DocumnetsSlicer
    }
})