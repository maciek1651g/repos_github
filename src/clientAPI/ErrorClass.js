class ErrorClass
{
    errorCode = null;
    errorText = null;
    errorMessage = null;

    constructor(code, text, message=null) {
        this.errorCode = code;
        if(message!==null)
        {
            this.errorText = this.createText(code, message)
        }
        else
        {
            this.errorText = text;
        }

        this.errorMessage = message;
    }

    createText(errorCode, message)
    {
        switch (errorCode)
        {
            case 404:
                if(message==="Not Found") return "Nie znaleziono użytkownika.";
                else return message;
            case 401:
                if(message==="Bad credentials") return "Niepoprawna autoryzacja.";
                else return message;
            case 403:
                return "Przekroczono limit 60 zapytań na godzinę, proszę spróbować później.";
            default:
                return "Nie rozpoznany błąd."
        }
    }
}

export default ErrorClass