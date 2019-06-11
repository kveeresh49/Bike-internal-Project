import { Component, OnInit, createPlatform } from '@angular/core';
import { BikeserviceService } from 'src/app/services/bikeservice.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
@Component({
  selector: 'app-bicycle',
  templateUrl: './bicycle.component.html',
  styleUrls: ['./bicycle.component.scss']
})
export class BicycleComponent implements OnInit {

  bomHeaders = [];
  bomDetails: any;
  itemselectedTab: any;
  selectedTab: any;
  orderFlag:boolean;
  cycleForm: FormGroup;
  cycleRadioButtonList: FormArray;
  mySecondForm: FormGroup;
  radioButtons: FormArray
  items: FormArray;
  bomHeaderDetails: any;
  options:any;
  myvalue:any;


  constructor(private fb: FormBuilder, private bikeService: BikeserviceService) { }

  ngOnInit() {
    this.loadAllHeaders();

  }

  // loading All Headers Left side of Cycle
  loadAllHeaders() {
    this.bikeService.loadAllHeaders().subscribe((data) => {
      this.bomHeaderDetails = data;
      this.selectedTab = this.bomHeaderDetails.headerMasterlist[0].bomType;
      this.myvalue = this.bomHeaderDetails.headerMasterlist[0].bomId;
      console.log(data);
    });
  }

  getClickHeaders(bomId,bomType) {
    this.myvalue = bomId;
    this.selectedTab = bomType;
    console.log('bomId',bomId);
    console.log('bomType',bomType);
  }

  getOrderVal(item,detail) {
    item.listDetails.forEach((itm,idx) => {

      if(itm.materialDesc === detail.materialDesc) {
        detail.order = true;
        this.orderFlag = true;
      } else {
        itm.order = false;
        item.listDetails[idx].order = false;
      }

    });

  }

  submitBomHeaders() {
    this.bomHeaderDetails.user.username = JSON.parse(sessionStorage.currentUser).username;
    console.log(this.orderFlag);
    this.bikeService.saveOrderDetails(this.bomHeaderDetails).subscribe((data)=> {
      console.log(data)
    })
  }
}


