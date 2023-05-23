import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor() { }

  async setData(key, value){
    await Preferences.set({
      key:key,
      value: value
    });
  }

  async getData(key){
    let res = await Preferences.get({key:key});
    return res.value;
  }

  async removeData(key){
    await Preferences.remove({key:key})
  }

}
