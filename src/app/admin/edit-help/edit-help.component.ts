import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-help',
    templateUrl: './edit-help.component.html',
    styleUrls: ['./edit-help.component.scss']
})
export class EditHelpComponent implements OnInit {
    questions = [{
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'When will the seller send out the order?',
        answer: 'After successful payment, the seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }, {
        question: 'Why is there no tracking info. after shipment?',
        answer: 'The seller will be preparing the shipment and send the goods in due time. If the shipment is not completed in the required time on the order page, GardYard will close the order and return all the funds to you.'
    }];
    constructor() {}

    ngOnInit(): void {}

}
