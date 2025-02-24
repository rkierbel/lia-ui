import {Injectable} from '@angular/core';
import {FrontErrorType} from "../interface/error";
import {langMap, LangMap} from "./lang-map";
import {Feature} from "../interface/feature";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private activeLang: LangMap = 'en';

  constructor() {
  }

  public setActiveLang(lang: LangMap) {
    this.activeLang = lang;
  }

  private getActiveLang() {
    return this.activeLang;
  }

  public getTranslatedError(errorType: FrontErrorType): string {
    return langMap[this.getActiveLang()].errors[errorType];
  }

  public getTranslatedFeature(name: Feature): string {
    return langMap[this.getActiveLang()].feature[name];
  }
}
