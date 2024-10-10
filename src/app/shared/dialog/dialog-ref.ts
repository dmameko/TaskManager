import { OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';

export class DialogRef {
  private _afterClosedSubject = new Subject<any>();

  constructor(private _overlayRef: OverlayRef) {}

  public close(result?: any) {
    this._overlayRef.dispose();
    this._afterClosedSubject.next(result);
    this._afterClosedSubject.complete();
  }

  public afterClosed(): Observable<any> {
    return this._afterClosedSubject.asObservable();
  }
}
