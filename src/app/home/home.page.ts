import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: string;

  txtToCode: string;

  showCamera: boolean = false;

  constructor(private qrScanner: QRScanner) {}

  createQRCode() {
    this.data = this.txtToCode;
    this.txtToCode = '';
  }

  scancode() {
    // this.qrScanner.openSettings();
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
           document.getElementsByTagName("ion-content")[0].style.opacity = "0";
          this.qrScanner.show();
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: any) => {
            console.log("Résultat scan : ", JSON.parse(text));
            // console.log(JSON.parse(text));
            console.log("email: ", JSON.parse(text).email);
            console.log("password: ", JSON.parse(text).password);
            this.qrScanner.hide(); // hide camera preview
             document.getElementsByTagName("ion-content")[0].style.opacity = "1";
            scanSub.unsubscribe(); // stop scanning
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }
}
