import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { wording } from 'src/app/utils/wording';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public country!:string;
  public olympic!:Olympic;
  public dataLoaded:boolean = false;
  public errors:string[] = [];

  constructor(private olympicService: OlympicService,
              private activeRoute:ActivatedRoute) {}

  ngOnInit(): void {
    const routeId:number = this.activeRoute.snapshot.params['id'];
    this.olympicService.getOlympicById(routeId).subscribe((data)=> {
      this.olympic = data;
      this.country = this.olympic?.country;
      this.olympicService.getErrorMessages().forEach(errorMessage => this.errors.push(errorMessage));
      this.dataLoaded = true;
    });
    if (this.olympic == undefined) {
      let errorMessage = wording.page.details.notFound('id', routeId);
      if (!this.errors.includes(errorMessage)) {
        this.errors.push(errorMessage);
      }
    }
  }
}
