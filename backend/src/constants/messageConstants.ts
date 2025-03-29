export const Messages = {
    // Form validation
    EMAIL_ALREADY_EXISTS: "Email already exists",
    INVALID_EMAIL: "Enter a valid email",
    INVALID_MOBILE: "Enter a valid mobile",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
    WRONG_CONFIRM_PASSWORD: "Confirm password is incorrect",
    FORM_VALIDATION_SUCCESS: "Form data validated",
    REGISTRATION_SUCCESS: "Registration successful!",
    REGISTRATION_FAILED: "Registration failed, please try again!",
    INVALID_OTP: "Incorrect OTP",
    OTP_TIME_LIMIT_EXCEEDED: "Time limit exceeded, please resend OTP",
    OTP_VERIFICATION_FAILED: "OTP verification failed!",
    OTP_RESENT: "OTP has been resent",
    FAILED_TO_RESEND_OTP: "Failed to resend OTP",
    USER_NOT_FOUND: "User not found",
    INCORRECT_PASSWORD: "Incorrect password",
    LOGIN_SUCCESS: "Login successful",
    LOGIN_VERIFICATION_FAILED: "Failed to complete login credentials check",
    LOGOUT_SUCCESS: "Tokens cleared, logout successful!",
    LOGOUT_FAILED: "Failed to complete logout",
    BLOCK_USER: 'User is blocked',
    RESET_PASSWORD_SUCCESS: "Password reset. Check your email",
    RESET_PASSWORD_FAILED: 'Password reset failed. Please try again.',
    FIELDS_REQUIRED: "Please fill in all required fields",

    // Worker
    WORKER_CREATED_SUCCESS: "Worker created successfully",
    WORKER_CREATION_FAILED: "Failed to add worker",
    FETCH_WORKER_SUCCESS: "Fetch workers successful!",
    FETCH_WORKER_FAILED: "Failed to fetch workers data",
    FETCH_WORKER_ROLES_SUCCESS: "Worker roles fetched successfully",
    FETCH_WORKER_ROLES_FAILURE: "Failed to fetch worker roles",
    ADD_WORKER_SUCCESS: "Worker added successfully",
    ADD_WORKER_FAILURE: "Failed to add worker",

    // Equipment
    INVALID_COUNT: "Count must be a positive number",
    EQUIPMENT_ADDED_SUCCESS: "Equipment added successfully",
    EQUIPMENT_ADDED_FAILED: "Equipment added failed",
    EQUIPMENT_FETCH_SUCCESS: "Equipment fetched successfully",
    EQUIPMENT_FETCH_FAILED: "Server error occurred while fetching equipment",
    AVAILABLE_EQUIPMENT_FETCH_SUCCESS: "Fetching available equipment success",
    AVAILABLE_EQUIPMENT_FETCH_FAILED: "Server error occurred while fetching available equipment",
    PROJECT_EQUIPMENT_FETCH_FAILED: "Server error occurred while fetching project equipment",
    EQUIPMENT_ACTION_SUCCESS: "Equipment action success",
    EQUIPMENT_ACTION_FAILED: "Equipment action failed",
    CHECK_EQUIPMENT_AVAILABILITY_SUCCESS: "Equipment availability check successful",
    CHECK_EQUIPMENT_AVAILABILITY_FAILED: "Checking equipment availability failed",
    ADD_EQUIPMENT_TO_TASK_SUCCESS: "Equipment added to task successfully",  
    ADD_EQUIPMENT_TO_TASK_FAILED: "Adding equipment to task failed",  

    // Project
    STARTING_DATE_GREATER: "Starting date is greater than ending date",
    PROJECT_ADDED_SUCCESS: "Successfully added new project",
    PROJECT_ADD_SERVER_ERROR: "Server error occurred while adding the project",
    PROJECTS_FETCH_SUCCESS: "Successfully fetched projects",
    PROJECTS_FETCH_FAILED: "Server error occurred while fetching projects",
    SINGLE_PROJECTS_FETCH_SUCCESS: "Successfully fetched single project details",
    SINGLE_PROJECTS_FETCH_FAILED: "Server error occurred while fetching single project details",
    PROJECT_STATUS_UPDATE_SUCCESS: "Project status updated successfully",
    PROJECT_STATUS_UPDATE_FAILURE: "Failed to update project status",

    // Controller auth
    REGISTER_CONTROLLER_ERROR: "Unexpected error in register controller",
    OTP_SERVER_ERROR: "Server error during OTP verification",
    OTP_RESEND_SERVER_ERROR: "Server error during OTP resend",
    LOGIN_SERVER_ERROR: "Server error during login",
    LOGOUT_SERVER_ERROR: "Server error during logout",

    // Controller contractor
    ADD_WORKER_SERVER_ERROR: "Server error during worker addition",
    FETCH_WORKERS_SERVER_ERROR: "Server error during workers fetch",
    ADD_EQUIPMENT_SERVER_ERROR: "Server error during equipment addition",
    FETCH_EQUIPMENT_SERVER_ERROR: "Server error during equipment fetch",
    ADD_PROJECT_SERVER_ERROR: "Server error during project addition",
    FETCH_PROJECTS_SERVER_ERROR: "Server error during projects fetch",
    
    // Tokens
    ACCESS_TOKEN_INVALID: 'Access token verification failed',
    REFRESH_TOKEN_INVALID: 'Refresh token verification failed',
    NO_TOKEN: 'No tokens found in the request',
    
    // Google auth
    GOOGLE_AUTH_SUCCESS: "Google authentication successful",
    GOOGLE_AUTH_FAILED: "Google authentication failed",
    
    // Tasks
    TASK_ADDED_SUCCESS: "Task added successfully",
    TASK_ADDED_FAILED: "Task added failed",
    ADD_TASK_SERVER_ERROR: "Server error during task addition",
    TASK_STATUS_UPDATE_SUCCESS: "Task status updated successfully",
    TASK_STATUS_UPDATE_FAILURE: "Failed to update task status",
    SINGLE_TASK_FETCH_SUCCESS: "Successfully fetched single task details",
    SINGLE_TASK_FETCH_FAILED: "Feching single task details failed",

}