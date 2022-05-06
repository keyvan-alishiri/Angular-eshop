import { Component, OnInit } from '@angular/core';


import { Slider } from 'src/app/models/Sliders/slider';
import { SliderService } from 'src/app/services/slider.service';
import { DomainName } from 'src/app/Utilities/PathTools';

// declare var  $:any;  //Write jquery Code with typescript

declare function homeSlider():any ;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

public sliders: Slider[] =[];
public domain: string = DomainName;
  constructor(private sliderService : SliderService) { }

  ngOnInit(): void {

    this.sliderService.getCurrentSlider().subscribe( sliders =>
      {


        if(sliders === null)
        {
          this.sliderService.getSliders().subscribe( res => {
            if(res.status === "Success"){
              this.sliderService.setCurrentSliders(res.data);
            }
          });

        }else
        {
          this.sliders = sliders;
         setInterval( () => {
          homeSlider();
         },100);
        }

        //console.log(sliders);
        // $(document).ready(() => {
        //   console.log('this is jquery from typescrit');
        // });





      });

  }



}
