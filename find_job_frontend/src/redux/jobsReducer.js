import { SET_API_KEYS, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB, SET_FAVORITE_CHECK, RESET_FAVORITE_CHECK, SET_APPLIED_CHECK, RESET_APPLIED_CHECK, SET_CURRENT_FAVORITE_JOB, SET_CURRENT_APPLIED_JOB, SET_USER_JOBS, SET_SHOW_SHARE_OPTIONS, RESET_SHOW_SHARE_OPTIONS, SET_APP_USER_LOCATION, SET_FROM_FAVORITE_JOBS, SET_FROM_APPLIED_JOBS, RESET_FROM_FAVORITE_AND_FROM_APPLIED_JOBS } from './actionTypes'

const initialState = {
    USAJobsAPIKey: '',
    Google_mapsAPIKey: '',
    myEmail: '',
    jobsReturnedFromSearch: '',
    currentJob: '',
    favoriteCheck: '',
    appliedCheck: '',
    currentFavoriteJob: '',
    currentAppliedJob: '',
    userJobs: [],
    showShareOptions: false,
    appUserLocation: '',
    fromFavoriteJobs: '',
    fromAppliedJobs: ''
}

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_KEYS:
        return{
            ...state,
            USAJobsAPIKey: action.payload.USAJobsAPIKey,
            Google_mapsAPIKey: action.payload.GOOGLE_MAPS_API_KEY,
            myEmail: action.payload.myEmail
        }

        case LOGOUT:
        return{
            ...state,
            USAJobsAPIKey: '',
            Google_mapsAPIKey: '',
            myEmail: '',
            jobsReturnedFromSearch: '',
            currentJob: '',
            favoriteCheck: '',
            appliedCheck: '',
            currentFavoriteJob: '',
            currentAppliedJob: '',
            userJobs: [],
            showShareOptions: false,
            appUserLocation: '',
            fromFavoriteJobs: '',
            fromAppliedJobs: ''
        }

        case SET_JOBS_RETURNED_FROM_SEARCH:
        let searchReturnedJobsArray = action.payload
        let transformedJobs = Array.from(new Set(searchReturnedJobsArray.map(job => job.MatchedObjectId )))
                                .map(MatchedObjectId => {
                                return {
                                    usaJobs_job_id: parseInt(MatchedObjectId),
                                    position_id: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionID,
                                    user_id: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).user_id || null,
                                    job_title: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionTitle,
                                    organization_name: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.OrganizationName,
                                    url: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.ApplyURI[0],
                                    department: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.DepartmentName,
                                    job_type: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionOfferingType.map(jobType => jobType.Name).join(', '),
                                    schedule: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionSchedule.map(schedule => schedule.Name).join(', '),
                                    description: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.UserArea.Details.JobSummary,
                                    requirement: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.QualificationSummary,
                                    minimum_pay: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionRemuneration[0].MinimumRange,
                                    maximum_pay: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionRemuneration[0].MaximumRange,
                                    pay_period: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionRemuneration[0].RateIntervalCode,
                                    employer_strongpoints: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.UserArea.Details.AgencyMarketingStatement,
                                    who_may_apply: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.UserArea.Details.WhoMayApply.Name,
                                    hiring_path: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.UserArea.Details.HiringPath.join(', '),
                                    locations: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PositionLocation.map(location => location.LocationName).join('; '),
                                    // To take locations back to an array do this:   locations.split('; ')
                                    job_posting_date: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.PublicationStartDate,
                                    application_close_date: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).MatchedObjectDescriptor.ApplicationCloseDate,
                                    //a = locations.map(location => location.LocationName) to get an array of attributes of each location
                                    applied_key: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).applied_key || false,
                                    favorite_key: searchReturnedJobsArray.find(job => job.MatchedObjectId === MatchedObjectId).favorite_key || false,
                                }
                                })
        return{
            ...state,
            jobsReturnedFromSearch: transformedJobs
        }

        case SET_USER_JOBS:
        return{
            ...state,
            userJobs: action.payload
        }

        case SET_CURRENT_JOB:
        return {
            ...state,
            currentJob: action.payload
        }

        case SET_CURRENT_FAVORITE_JOB:
        return{
            ...state,
            currentFavoriteJob: action.payload
        }

        case SET_CURRENT_APPLIED_JOB:
            return{
                ...state,
                currentAppliedJob: action.payload
            }

        case SET_FAVORITE_CHECK:
        return{
            ...state,
            favoriteCheck: true
        }

        case RESET_FAVORITE_CHECK:
        return {
            ...state,
            favoriteCheck: false
        }

        case SET_APPLIED_CHECK:
        return {
            ...state,
            appliedCheck: true
        }

        case RESET_APPLIED_CHECK:
        return {
            ...state,
            appliedCheck: false
        }

        case SET_SHOW_SHARE_OPTIONS:
        return {
            ...state,
            showShareOptions: true
        }

        case RESET_SHOW_SHARE_OPTIONS:
        return {
            ...state,
            showShareOptions: false
        }

        case SET_APP_USER_LOCATION:
        return {
            ...state,
            appUserLocation: action.payload
        }

        case SET_FROM_FAVORITE_JOBS:
        return {
            ...state,
            fromFavoriteJobs: true
        }

        case SET_FROM_APPLIED_JOBS:
        return {
            ...state,
            fromAppliedJobs: true
        }

        case RESET_FROM_FAVORITE_AND_FROM_APPLIED_JOBS:
        return {
            ...state,
            fromFavoriteJobs: false,
            fromAppliedJobs: false
        }

        default:
        return state
    }
}

export default jobsReducer