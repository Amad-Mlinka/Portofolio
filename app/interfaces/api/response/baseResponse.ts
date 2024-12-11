export default interface BaseResponse<T> {
    request_type: string;  // The type of request (e.g., 'GET', 'POST')
    success: boolean;      // Success or failure status
    code: number;          // HTTP status code
    call: string;          // The API endpoint being called
    message: string;       // Any message returned (e.g., error message or success message)
    error: string | null;  // Error message if status is false, null otherwise
    data: T | null;        // The data returned from the API, can be any type
  }