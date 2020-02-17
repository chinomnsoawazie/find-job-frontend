import {SET_CURRENT_JOB, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_API_KEYS, SET_JOB_FROM_MY_DASHBOARD, RESET_JOB_FROM_MY_DASHBOARD, SET_APPLY_CHECK, SET_FAVORITE_CHECK} from './actionTypes'

const initialState = {
    jobs: '',
    currentJob: '',
    jobFromMyDashboard: '',
    USAJobsAPIKey: '',
    Google_mapsAPIKey: '',
    myEmail: '',
    jobsReturnedFromSearch: '',
    appliedCheck: false,
    favoriteCheck: false

  }
  
  const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REMOVE_ALL":
      return {
        ...state,
        jobs: []
      }

      case SET_CURRENT_JOB:
      return{
        ...state,
        currentJob: action.payload
      }

      case SET_APPLY_CHECK:
      return{
        ...state,
        appliedCheck: true
      }

      case SET_FAVORITE_CHECK:
      return{
        ...state,
        favoriteCheck: true
      }

      case SET_JOB_FROM_MY_DASHBOARD:
      return {
        ...state,
        jobFromMyDashboard: true
      }

      case RESET_JOB_FROM_MY_DASHBOARD:
      return {
        ...state,
        jobFromMyDashboard: false
      }

      case SET_API_KEYS:

      return {
        ...state,
        USAJobsAPIKey: action.payload.USAJobsAPIKey,
        Google_mapsAPIKey: action.payload.GOOGLE_MAPS_API_KEY,
        myEmail: action.payload.myEMail
      }

      case SET_JOBS_RETURNED_FROM_SEARCH:
        let searchReturnedJobsArray = action.payload
        let transformedJobs = Array.from(new Set(searchReturnedJobsArray.map(job => job.MatchedObjectId )))
                              .map(MatchedObjectId => {
                                // debugger
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

      case LOGOUT:
      return{
        ...state,
        jobs: '',
        currentJob: '',
        jobFromMyDashboard: '',
        USAJobsAPIKey: '',
        Google_mapsAPIKey: '',
        myEmail: '',
        jobsReturnedFromSearch: '',
        appliedCheck: false,
        favoriteCheck: false
      }
  
      default:
        return state
    }
  }
  
  export default jobsReducer