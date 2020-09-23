import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/models/medicine/medicine';
import { Search } from 'src/app/models/medicine/search';
import { MedicineService } from 'src/app/services/medicine/medicine.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public imageSearched: string;
  public imgView: any;

  public imageName: string;

  public medicineModel = new Medicine('');

  public searchModel = new Search('');

  constructor(
    public medicineService: MedicineService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.imageName = event.target.files[0].name;
      if (event.target.files[0].type === 'image/png' || event.target.files[0].type === 'image/jpg') {
        reader.onload = (_event) => {
          this.imgView = reader.result;
          this.imageSearched = this.imgView.toString().slice(22);
          this.searchModel.image = this.imgView;
        };
      } else if (event.target.files[0].type === 'image/jpeg') {
        reader.onload = (_event) => {
          this.imgView = reader.result;
          this.imageSearched = this.imgView.toString().slice(23);
          this.searchModel.image = this.imgView;
        };
      }
    }
  }

  search() {
    this.medicineService.medicineUpload(this.searchModel).then(
      data => {
        if (data) {
          localStorage.setItem('medicine', 'Kinihiriya');
          this.router.navigate(['/shop']);
        }
      }
    );
  }

}
