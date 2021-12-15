import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCategoriesService {


  public allCategoriesArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public categoriesArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  public subCategoriesArray: any = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  constructor() { }

  sortCategories(resoponse: any) {
    if (this.allCategoriesArray[0] == 1) {
      this.allCategoriesArray = []
      this.categoriesArray = []
      this.subCategoriesArray = []
    }
    for (let value of resoponse) {
      this.allCategoriesArray.push(value)
      if (value.parent == null)
        this.categoriesArray.push(value)
      else
        this.subCategoriesArray.push(value)
    }
  }
  getCategories(parentId) {
    let cat = [];
    for (let value of this.allCategoriesArray) {
      if (value.parent == parentId) {
        cat.push(value);
      }
    }
    return cat;
  }

  checkCategoriesHasChild(parentId) {
    if (this.getCategories(parentId).length == 0) return false
    else return true
  }

  getCategoryName(id) {
    let name = ""
    for (let value of this.allCategoriesArray) {
      if (value.id == id) { name = value.name; }
    }
    return name;
  }
  getCategoryObject(id) {
    let obj: any = {}
    for (let value of this.allCategoriesArray) {
      if (value.id == id) { obj = value }
    }
    return obj;
  }
  getCategoriesPageItems(parent) {
    let c = [];
    if (parent == undefined)
      c = this.categoriesArray;
    else {
      for (let v of this.allCategoriesArray) {
        if (v.parent == parent) {
          c.push(v);
        }
      }
    }
    return c;
  }
}
