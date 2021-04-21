import { Component } from '@angular/core';
import { DataManagementService } from './sharedServices/data-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SpaceX';
  allData: any[] = [];
  yearSelected: any;
  launched: any;
  landed: any;
  //yearsArray = [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  yearsArray = [
    {year: 2006, color: 'undefined'},
    {year: 2007, color: 'undefined'},
    {year: 2008, color: 'undefined'},
    {year: 2009, color: 'undefined'},
    {year: 2010, color: 'undefined'},
    {year: 2011, color: 'undefined'},
    {year: 2012, color: 'undefined'},
    {year: 2013, color: 'undefined'},
    {year: 2014, color: 'undefined'},
    {year: 2015, color: 'undefined'},
    {year: 2016, color: 'undefined'},
    {year: 2017, color: 'undefined'},
    {year: 2018, color: 'undefined'},
    {year: 2019, color: 'undefined'},
    {year: 2020, color: 'undefined'}
  ]
launchArray = [
  {name: 'true', color: 'undefined'},
  {name: 'false', color: 'undefined'}
]
landArray = [
  {name: 'true', color: 'undefined'},
  {name: 'false', color: 'undefined'}
]

  public_url = "https://api.spaceXdata.com/v3/launches?limit=100";
  constructor(private dataService: DataManagementService) {

  }
  ngOnInit() {
    this.dataService.getAllDetails().subscribe((response: any) => {
      this.allData = response;
      console.log(response);
    })
  }
  yrSelected(year: any) {
   // year.color = 'enabled';
  for (let i = 0; i < this.yearsArray.length; i++) {
    if(this.yearsArray[i].year !== year.year) {
      this.yearsArray[i].color = 'nocolor';
    }
    if(this.yearsArray[i].year === year.year && this.yearsArray[i].color === 'enabled') {
      this.dataService.getYear.next(null);
      this.yearsArray[i].color = 'nocolor';
      this.checkNoneSelected();
      // }
    } else if(this.yearsArray[i].year === year.year ) {
      this.dataService.getYear.next(year.year);
      this.yearsArray[i].color = 'enabled';
    }
  }
    this.trigger();
    console.log(year);
  }
  launchSelected(value: any) {
   // value.color = 'enabled';
    for (let i = 0; i < this.launchArray.length; i++) {
      if(this.launchArray[i].name !== value.name) {
        this.launchArray[i].color = 'nocolor';
      }
      if(this.launchArray[i].name === value.name && this.launchArray[i].color === 'enabled') {
        this.dataService.getLaunch.next(null);
        this.launchArray[i].color = 'nocolor';
        this.checkNoneSelected();
        console.log(this.dataService.getYear.getValue())
      } else if(this.launchArray[i].name === value.name) {
    this.dataService.getLaunch.next(value.name);
        this.launchArray[i].color = 'enabled';
      }
    }
    
    this.trigger();
    console.log(value);
  }
  landingSelected(value: any) {  
    // value.color = 'enabled';
  for (let i = 0; i < this.landArray.length; i++) {
    if(this.landArray[i].name !== value.name) {
      this.landArray[i].color = 'nocolor';
    }
    if(this.landArray[i].name === value.name && this.landArray[i].color === 'enabled') {
      this.dataService.getLanding.next(null);
      this.landArray[i].color = 'nocolor';
      this.checkNoneSelected();
     
    } else if(this.landArray[i].name === value.name) {
      this.dataService.getLanding.next(value.name);
      this.landArray[i].color = 'enabled';
    }
  }
    this.trigger();
    console.log(value);
  }

  checkNoneSelected() {
    let yr = this.dataService.getYear.getValue();
    let launch = this.dataService.getLaunch.getValue();
    let land = this.dataService.getLanding.getValue();
    if(yr === null && land === null && launch === null) {
        this.dataService.getAllDetails().subscribe((response: any) => {
          this.allData = response;
          console.log(response);
        })
      }
    console.log(yr);
    console.log(launch);
    console.log(land);
  }

  trigger() {
    let api_url = '';
    if (this.dataService.getLaunch.getValue()) {
      if (this.dataService.getLanding.getValue()) {
        if (this.dataService.getYear.getValue()) {
           /* launch, land, yeart */
          api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + this.dataService.getYear.getValue() + '&launch_success=' + this.dataService.getLaunch.getValue() + '&land_success=' + this.dataService.getLanding.getValue();
          this.dataService.getData(api_url).subscribe((response: any) => {
            this.allData = response;
            console.log(response);
          })
        } else {
          /* launch and land */
          api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&&launch_success=' + this.dataService.getLaunch.getValue() + '&land_success=' + this.dataService.getLanding.getValue();
          this.dataService.getData(api_url).subscribe((response: any) => {
            this.allData = response;
            console.log(response);
          })
        }
      } else if(this.dataService.getLaunch.getValue()) {
        if(this.dataService.getYear.getValue()) {
          let val = this.dataService.getYear.getValue()
        api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + val + '&launch_success=' + this.dataService.getLaunch.getValue();
        this.dataService.getData(api_url).subscribe((response: any) => {
          this.allData = response;
          console.log(response);
        })
        } else {
   /* only launch */
   console.log('yes')
   let val = this.dataService.getLaunch.getValue()
   api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + val;
   this.dataService.getData(api_url).subscribe((response: any) => {
     this.allData = response;
     console.log(response);
   })
        }
     
      } else if (this.dataService.getYear.getValue()) {
        let val = this.dataService.getYear.getValue()
        api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + val + '&launch_success=' + this.dataService.getLaunch.getValue();
        this.dataService.getData(api_url).subscribe((response: any) => {
          this.allData = response;
          console.log(response);
        })
      }
    } else if (this.dataService.getLanding.getValue()) {
      if (this.dataService.getYear.getValue()) {
        /* launch and land */
        api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_success=' + this.dataService.getLaunch.getValue() + '&land_success=' + this.dataService.getLanding.getValue();
        this.dataService.getData(api_url).subscribe((response: any) => {
          this.allData = response;
          console.log(response);
        })
      } else {
        /* only land*/
        api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&land_success=' + this.dataService.getLanding.getValue();
        this.dataService.getData(api_url).subscribe((response: any) => {
          this.allData = response;
          console.log(response);
        })
      }

    } else if (this.dataService.getYear.getValue()) {
      /* only year */
      console.log('noooooo')
      let val = this.dataService.getYear.getValue()
      api_url = 'https://api.spaceXdata.com/v3/launches?limit=100&launch_year=' + val;
      this.dataService.getData(api_url).subscribe((response: any) => {
        this.allData = response;
        console.log(response);
      })
    }


  }
  
}
