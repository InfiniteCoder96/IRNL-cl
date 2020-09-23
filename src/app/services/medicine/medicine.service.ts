import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Medicine} from '../../models/medicine/medicine';
import {Search} from '../../models/medicine/search';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  medicine_url: string;
  medicine_search_url: string;
  medicine_upload_url: string;
  python_script_search_url: string;

  options: any;
  headers: any;

  constructor(
    private http: HttpClient
  ) {
    this.medicine_url = `http://localhost:8099/medicine/list`;
    this.medicine_search_url = `http://localhost:8099/searchengine/search`;
    this.medicine_upload_url = `http://localhost:8099/searchengine/upload`;
    this.python_script_search_url = `http://988ee4374ba7.ngrok.io/execute`;

    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('X-Requested-With', 'XMLHttpRequest');
    this.options = {
      headers: this.headers,
      observe: 'response',
      responseType: 'text'
    };
  }

  retrieveMedicineList(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.medicine_url}`).subscribe(
        async data => {
          return await resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  searchMedicineList(medicine: Medicine): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.medicine_search_url}`, medicine).subscribe(
        async data => {
          return await resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  medicineUpload(search: Search): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.medicine_upload_url}`, search).subscribe(
        async data => {
          return await resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }

  scriptResult(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.python_script_search_url}`).subscribe(
        async data => {
          return await resolve(data);
        },
        err => {
          return reject(err);
        }
      );
    });
  }
}
