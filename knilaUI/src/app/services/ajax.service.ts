import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CAjaxservice{
    private apiPrepend = 'https://localhost:7102/api/';
    private headers={headers: new HttpHeaders()}
    constructor(private http: HttpClient) {}

    getData(apiURL:string,Loader:boolean=false)
    {
       return this.executeGET(apiURL,Loader);
    }
    getDataAnonymous(apiURL:string,data:any={},Loader:boolean=false)
    {
        return this.executeGET(apiURL,Loader,{headers: new HttpHeaders({'allow-ananymous': 'allow'})});
    }
    postData(apiURL:string,data:any={},Loader:boolean=false)
    {
       return this.executePOST(apiURL,data,Loader);  
    }
    postDataAnonymous(apiURL:string,data:any={},Loader:boolean=false){
        return this.executePOST(apiURL,data,Loader,{headers: new HttpHeaders({'allow-ananymous': 'allow'})});
    }
    postDataWithFile(apiURL:string,data:any={},Loader:boolean=false){
        const formData = new FormData();
        for (const key of Object.keys(data)) {
          formData.append(key, data[key]);
        }
        return this.executePOST(apiURL,formData,false);
    }
    private  executePOST(apiURL:string,reqdata:any={},Loader:boolean,options?:any)
    {
        if(!options){options=this.headers}
        if(reqdata && reqdata.constructor.name !== "FormData") options.headers.set('Content-Type','application/json');
        return this.http.post(this.apiPrepend+apiURL,reqdata,options);       
       // return this.http.get(this.apiPrepend+apiURL,options);       
    } 
    private  executeGET(apiURL:string,Loader:boolean,options?:any)
    {
        if(!options){options=this.headers}
        options.headers.set('Content-Type','application/json');
        return this.http.get(this.apiPrepend+apiURL,options);       
       // return this.http.get(this.apiPrepend+apiURL,options);       
    } 

}



