const responseHandler = (res, statusCode, message, data=null) =>{
    try {
        if (!res){
            console.error('Response object not provided')
        }

        return res.status(statusCode).json({
            message,
            success: statusCode < 400 ? true : false,
            data
        })
    } catch (error) {
        console.error('Error in response Handler', error)
    }
}

export default responseHandler