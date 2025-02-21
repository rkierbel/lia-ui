import {Injectable} from '@angular/core';
import {langMap, UserLang} from "../interface/user-lang";
import {FrontErrorType} from "../interface/error";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private activeLang: UserLang = 'en';

  constructor() { }

  public setActiveLang(lang: UserLang) {
    this.activeLang = lang;
  }

  public getActiveLang() {
    return this.activeLang;
  }

  public getTranslatedError(lang: UserLang, errorType: FrontErrorType): string {
    return langMap[lang].errors[errorType];
  }
}
