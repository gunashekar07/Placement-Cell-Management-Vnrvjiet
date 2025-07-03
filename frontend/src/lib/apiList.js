export const server = "http://localhost:4444";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
  
  // Admin endpoints
  adminApplicants: `${server}/api/admin/applicants`,
  adminRecruiters: `${server}/api/admin/recruiters`,
  adminJobs: `${server}/api/admin/jobs`,
  adminApplications: `${server}/api/admin/applications`,
  adminStats: `${server}/api/admin/statistics`,
  
  // Host for file access
  host: `${server}`,
};

export default apiList;
