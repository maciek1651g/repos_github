import ErrorClass from "./ErrorClass";

class ClientAPI
{
    static baseUrl = "https://api.github.com";

    onErrorFunction = null;
    onSuccessFunction = null;
    functionAfterRequest = null;
    backgroundFunctionHandler = null;

    sendMessage (method, url, jsonData=null, headers = {})
    {
        let xhr = new XMLHttpRequest();
        xhr.open(method.toUpperCase(), ClientAPI.baseUrl+url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
        xhr.timeout = 5000;

        let response = null;

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4)
            {

                if(xhr.status===200)
                {
                    response = xhr.responseText;
                    response = this.jsonToData(response);
                    this.onSuccess(response);
                }
                else
                {
                    if(xhr.status!==0)
                    {
                        response = xhr.responseText;
                        response = this.jsonToData(response);
                        let error = new ErrorClass(xhr.status, xhr.statusText, response.message);
                        this.onError(error);
                        response = null;
                    }
                }
            }
        }
        xhr.ontimeout = (e) => {
            this.onError(new ErrorClass(404, "Zbyt długi czas oczekiwania na odpoweidź"))
        }
        xhr.onabort = (e) => {
            this.onError(new ErrorClass(404, "Zatrzymano zapytanie z nieznanych przyczyn"))
        }
        xhr.onerror = (e) => {
            console.log(e);
        }

        let headersKeys = Object.keys(headers);
        for(let i=0;i<headersKeys.length;i++)
        {
            let key = headersKeys[i];
            xhr.setRequestHeader(key+"",headers[key]+"");
        }

        xhr.send(jsonData);
    }

    onSuccess(response)
    {
        if(this.backgroundFunctionHandler!==null)
        {
            this.backgroundFunctionHandler(response);
        }
        if(this.onSuccessFunction!==null)
        {
            this.onSuccessFunction(response)
        }
        this.afterRequest();
    }

    onError(errorInfo)
    {
        console.log(errorInfo)
        if(this.backgroundFunctionHandler!==null)
        {
            this.backgroundFunctionHandler(errorInfo);
        }
        if(this.onErrorFunction!==null)
        {
            this.onErrorFunction(errorInfo);
        }
        this.afterRequest();
    }

    afterRequest()
    {
        if(this.functionAfterRequest!==null)
        {
            this.functionAfterRequest();
        }
    }

    dataToJson(data)
    {
        try{
            return JSON.stringify(data);
        } catch(error) {
            this.onError(new ErrorClass(404, "Błąd konwersji danych do typu JSON"));
        }
    }

    jsonToData(jsonData)
    {
        try{
            return JSON.parse(jsonData);
        } catch(error) {
            this.onError(new ErrorClass(404, "Błąd konwersji typu JSON na dane"));
        }
    }


    getRepos(name)
    {
        this.sendMessage("GET","/users/"+name+"/repos");
    }

    getUserInfo(name)
    {
        this.sendMessage("GET","/users/"+name);
    }
}


export default ClientAPI;