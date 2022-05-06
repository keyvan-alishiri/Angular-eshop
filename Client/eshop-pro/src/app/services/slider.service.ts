import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeSliderResponse } from '../models/Sliders/homeSliderResponse';
import { Slider } from '../models/Sliders/slider';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private homeSlider: BehaviorSubject<Slider[]> = new BehaviorSubject<Slider[]>(null);

  constructor(private http: HttpClient) { }


  public getSliders(): Observable<HomeSliderResponse>{
  return this.http.get<HomeSliderResponse>('/api/slider/GetActiveSliders');
  }

  public getCurrentSlider():Observable<Slider[]> {
    return this.homeSlider;
  }

  public setCurrentSliders(sliders: Slider[])
  {
    this.homeSlider.next(sliders);
  }
}
