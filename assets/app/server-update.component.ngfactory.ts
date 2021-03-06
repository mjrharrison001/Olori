/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as i0 from '@angular/core';
import * as i1 from './server-update.component';
import * as i2 from '@angular/forms';
import * as i3 from './server.service';
const styles_ServerUpdateComponent:any[] = ([] as any[]);
export const RenderType_ServerUpdateComponent:i0.RendererType2 = i0.ɵcrt({encapsulation:2,
    styles:styles_ServerUpdateComponent,data:{}});
export function View_ServerUpdateComponent_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),27,'form',[['novalidate',
      '']],[[2,'ng-untouched',(null as any)],[2,'ng-touched',(null as any)],[2,'ng-pristine',
      (null as any)],[2,'ng-dirty',(null as any)],[2,'ng-valid',(null as any)],[2,
      'ng-invalid',(null as any)],[2,'ng-pending',(null as any)]],[[(null as any),
      'ngSubmit'],[(null as any),'submit'],[(null as any),'reset']],(_v,en,$event) => {
    var ad:boolean = true;
    var _co:i1.ServerUpdateComponent = _v.component;
    if (('submit' === en)) {
      const pd_0:any = ((<any>i0.ɵnov(_v,2).onSubmit($event)) !== false);
      ad = (pd_0 && ad);
    }
    if (('reset' === en)) {
      const pd_1:any = ((<any>i0.ɵnov(_v,2).onReset()) !== false);
      ad = (pd_1 && ad);
    }
    if (('ngSubmit' === en)) {
      const pd_2:any = ((<any>_co.onSubmit()) !== false);
      ad = (pd_2 && ad);
    }
    return ad;
  },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i2.ɵbh,([] as any[]),
      (null as any),(null as any)),i0.ɵdid(540672,(null as any),0,i2.FormGroupDirective,
      [[8,(null as any)],[8,(null as any)]],{form:[0,'form']},{ngSubmit:'ngSubmit'}),
      i0.ɵprd(2048,(null as any),i2.ControlContainer,(null as any),[i2.FormGroupDirective]),
      i0.ɵdid(16384,(null as any),0,i2.NgControlStatusGroup,[i2.ControlContainer],
          (null as any),(null as any)),(_l()(),i0.ɵted((null as any),['\n'])),(_l()(),
          i0.ɵeld(0,(null as any),(null as any),17,'div',[['class','form-group row']],
              (null as any),(null as any),(null as any),(null as any),(null as any))),
      (_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),
          1,'label',[['class','col-2 col-form-label'],['for','interval']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['Interval'])),(_l()(),i0.ɵted((null as any),['\n  '])),(_l()(),i0.ɵeld(0,
          (null as any),(null as any),11,'div',[['class','col-10']],(null as any),
          (null as any),(null as any),(null as any),(null as any))),(_l()(),i0.ɵted((null as any),
          ['\n    '])),(_l()(),i0.ɵeld(0,(null as any),(null as any),8,'input',[['class',
          'form-control'],['formControlName','interval'],['id','interval'],['name',
          'interval'],['required',''],['type','number'],['value','240']],[[1,'required',
          0],[2,'ng-untouched',(null as any)],[2,'ng-touched',(null as any)],[2,'ng-pristine',
          (null as any)],[2,'ng-dirty',(null as any)],[2,'ng-valid',(null as any)],
          [2,'ng-invalid',(null as any)],[2,'ng-pending',(null as any)]],[[(null as any),
          'input'],[(null as any),'blur'],[(null as any),'compositionstart'],[(null as any),
          'compositionend'],[(null as any),'change']],(_v,en,$event) => {
        var ad:boolean = true;
        if (('input' === en)) {
          const pd_0:any = ((<any>i0.ɵnov(_v,14)._handleInput($event.target.value)) !== false);
          ad = (pd_0 && ad);
        }
        if (('blur' === en)) {
          const pd_1:any = ((<any>i0.ɵnov(_v,14).onTouched()) !== false);
          ad = (pd_1 && ad);
        }
        if (('compositionstart' === en)) {
          const pd_2:any = ((<any>i0.ɵnov(_v,14)._compositionStart()) !== false);
          ad = (pd_2 && ad);
        }
        if (('compositionend' === en)) {
          const pd_3:any = ((<any>i0.ɵnov(_v,14)._compositionEnd($event.target.value)) !== false);
          ad = (pd_3 && ad);
        }
        if (('change' === en)) {
          const pd_4:any = ((<any>i0.ɵnov(_v,15).onChange($event.target.value)) !== false);
          ad = (pd_4 && ad);
        }
        if (('input' === en)) {
          const pd_5:any = ((<any>i0.ɵnov(_v,15).onChange($event.target.value)) !== false);
          ad = (pd_5 && ad);
        }
        if (('blur' === en)) {
          const pd_6:any = ((<any>i0.ɵnov(_v,15).onTouched()) !== false);
          ad = (pd_6 && ad);
        }
        return ad;
      },(null as any),(null as any))),i0.ɵdid(16384,(null as any),0,i2.DefaultValueAccessor,
          [i0.Renderer,i0.ElementRef,[2,i2.COMPOSITION_BUFFER_MODE]],(null as any),
          (null as any)),i0.ɵdid(16384,(null as any),0,i2.ɵbe,[i0.Renderer,i0.ElementRef],
          (null as any),(null as any)),i0.ɵdid(16384,(null as any),0,i2.RequiredValidator,
          ([] as any[]),{required:[0,'required']},(null as any)),i0.ɵprd(1024,(null as any),
          i2.NG_VALIDATORS,(p0_0:any) => {
            return [p0_0];
          },[i2.RequiredValidator]),i0.ɵprd(1024,(null as any),i2.NG_VALUE_ACCESSOR,
          (p0_0:any,p1_0:any) => {
            return [p0_0,p1_0];
          },[i2.DefaultValueAccessor,i2.ɵbe]),i0.ɵdid(671744,(null as any),0,i2.FormControlName,
          [[3,i2.ControlContainer],[2,i2.NG_VALIDATORS],[8,(null as any)],[2,i2.NG_VALUE_ACCESSOR]],
          {name:[0,'name']},(null as any)),i0.ɵprd(2048,(null as any),i2.NgControl,
          (null as any),[i2.FormControlName]),i0.ɵdid(16384,(null as any),0,i2.NgControlStatus,
          [i2.NgControl],(null as any),(null as any)),(_l()(),i0.ɵted((null as any),
          ['\n  '])),(_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),
          ['\n'])),(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'button',[['class',
          'btn btn-primary'],['type','submit']],(null as any),(null as any),(null as any),
          (null as any),(null as any))),(_l()(),i0.ɵted((null as any),['Update'])),
      (_l()(),i0.ɵted((null as any),['\n'])),(_l()(),i0.ɵted((null as any),['\n']))],
      (_ck,_v) => {
        var _co:i1.ServerUpdateComponent = _v.component;
        const currVal_7:any = _co.myForm;
        _ck(_v,2,0,currVal_7);
        const currVal_16:any = '';
        _ck(_v,16,0,currVal_16);
        const currVal_17:any = 'interval';
        _ck(_v,19,0,currVal_17);
      },(_ck,_v) => {
        const currVal_0:any = i0.ɵnov(_v,4).ngClassUntouched;
        const currVal_1:any = i0.ɵnov(_v,4).ngClassTouched;
        const currVal_2:any = i0.ɵnov(_v,4).ngClassPristine;
        const currVal_3:any = i0.ɵnov(_v,4).ngClassDirty;
        const currVal_4:any = i0.ɵnov(_v,4).ngClassValid;
        const currVal_5:any = i0.ɵnov(_v,4).ngClassInvalid;
        const currVal_6:any = i0.ɵnov(_v,4).ngClassPending;
        _ck(_v,0,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
        const currVal_8:any = (i0.ɵnov(_v,16).required? '': (null as any));
        const currVal_9:any = i0.ɵnov(_v,21).ngClassUntouched;
        const currVal_10:any = i0.ɵnov(_v,21).ngClassTouched;
        const currVal_11:any = i0.ɵnov(_v,21).ngClassPristine;
        const currVal_12:any = i0.ɵnov(_v,21).ngClassDirty;
        const currVal_13:any = i0.ɵnov(_v,21).ngClassValid;
        const currVal_14:any = i0.ɵnov(_v,21).ngClassInvalid;
        const currVal_15:any = i0.ɵnov(_v,21).ngClassPending;
        _ck(_v,13,0,currVal_8,currVal_9,currVal_10,currVal_11,currVal_12,currVal_13,
            currVal_14,currVal_15);
      });
}
export function View_ServerUpdateComponent_Host_0(_l:any):i0.ɵViewDefinition {
  return i0.ɵvid(0,[(_l()(),i0.ɵeld(0,(null as any),(null as any),1,'app-info',([] as any[]),
      (null as any),(null as any),(null as any),View_ServerUpdateComponent_0,RenderType_ServerUpdateComponent)),
      i0.ɵdid(114688,(null as any),0,i1.ServerUpdateComponent,[i3.ServerService],(null as any),
          (null as any))],(_ck,_v) => {
    _ck(_v,1,0);
  },(null as any));
}
export const ServerUpdateComponentNgFactory:i0.ComponentFactory<i1.ServerUpdateComponent> = i0.ɵccf('app-info',
    i1.ServerUpdateComponent,View_ServerUpdateComponent_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiQzovVXNlcnMvbWpyaGEvRG9jdW1lbnRzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9Sb2IvQmFjay1lbmQvT2xvcmktc2VydmVyL2Fzc2V0cy9hcHAvc2VydmVyLXVwZGF0ZS5jb21wb25lbnQubmdmYWN0b3J5LnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vQzovVXNlcnMvbWpyaGEvRG9jdW1lbnRzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9Sb2IvQmFjay1lbmQvT2xvcmktc2VydmVyL2Fzc2V0cy9hcHAvc2VydmVyLXVwZGF0ZS5jb21wb25lbnQudHMiLCJuZzovLy9DOi9Vc2Vycy9tanJoYS9Eb2N1bWVudHMvRG9jdW1lbnRzL0RldmVsb3BtZW50L1JvYi9CYWNrLWVuZC9PbG9yaS1zZXJ2ZXIvYXNzZXRzL2FwcC9zZXJ2ZXItdXBkYXRlLmNvbXBvbmVudC5odG1sIiwibmc6Ly8vQzovVXNlcnMvbWpyaGEvRG9jdW1lbnRzL0RvY3VtZW50cy9EZXZlbG9wbWVudC9Sb2IvQmFjay1lbmQvT2xvcmktc2VydmVyL2Fzc2V0cy9hcHAvc2VydmVyLXVwZGF0ZS5jb21wb25lbnQudHMuU2VydmVyVXBkYXRlQ29tcG9uZW50X0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGZvcm0gW2Zvcm1Hcm91cF09XCJteUZvcm1cIiAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiPlxyXG48ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCByb3dcIj5cclxuICA8bGFiZWwgZm9yPVwiaW50ZXJ2YWxcIiBjbGFzcz1cImNvbC0yIGNvbC1mb3JtLWxhYmVsXCI+SW50ZXJ2YWw8L2xhYmVsPlxyXG4gIDxkaXYgY2xhc3M9XCJjb2wtMTBcIj5cclxuICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJudW1iZXJcIiB2YWx1ZT1cIjI0MFwiIGlkPVwiaW50ZXJ2YWxcIlxyXG4gICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgbmFtZT1cImludGVydmFsXCJcclxuICAgIHJlcXVpcmVkXHJcbiAgICBmb3JtQ29udHJvbE5hbWU9XCJpbnRlcnZhbFwiPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPGJ1dHRvbiAgdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+VXBkYXRlPC9idXR0b24+XHJcbjwvZm9ybT5cclxuIiwiPGFwcC1pbmZvPjwvYXBwLWluZm8+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7OztvQkNBQTtNQUFBO01BQUE7TUFBQTtNQUFBO0lBQUE7SUFBQTtJQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7TUFBQTtNQUFBO0lBQUE7SUFBMkI7TUFBQTtNQUFBO0lBQUE7SUFBM0I7RUFBQSx1Q0FBQTtNQUFBLG9DQUFBO01BQUE7YUFBQTthQUFBO1VBQUEsNkJBQW1ELHVDQUNuRDtpQkFBQTtjQUFBO01BQTRCLHlDQUMxQjtVQUFBO1VBQUEsMERBQW1EO1VBQUEsZUFBZ0IseUNBQ25FO1VBQUE7VUFBQSwwREFBb0I7VUFBQSxhQUNsQjtVQUFBO1VBQUE7VUFBQTtVQUFBO1VBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO1VBQUE7VUFBQTtRQUFBO1FBQUE7VUFBQTtVQUFBO1FBQUE7UUFBQTtVQUFBO1VBQUE7UUFBQTtRQUFBO01BQUEsdUNBQUE7VUFBQTtVQUFBLHNCQUFBO1VBQUEsb0NBQUE7VUFBQSw4REFBQTsyQkFBQTtZQUFBO1VBQUE7VUFBQTtZQUFBO1VBQUEsMkNBQUE7VUFBQTtVQUFBLHdDQUFBO1VBQUEsMkNBQUE7VUFBQSw0Q0FJMkI7VUFBQSxXQUN2Qix1Q0FDRjtVQUFBLFNBQ047VUFBQTtVQUFBLDhCQUErQztNQUFlLHVDQUN2RDs7O1FBWkQ7UUFBTixXQUFNLFNBQU47UUFPSTtRQUhBLFlBR0EsVUFIQTtRQUlBO1FBSkEsWUFJQSxVQUpBOztRQUpKO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUEsV0FBQSxxRUFBQTtRQUlJO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQTtRQUFBO1FBQUE7UUFBQSxZQUFBLFVBQUE7WUFBQSxxQkFBQTs7OztvQkNKSjtNQUFBO2FBQUE7VUFBQTtJQUFBOzs7OyJ9
