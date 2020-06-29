import Mail from '../../lib/Mail';

class TransportOrderCreateMail {
  get key() {
    return 'docTransportOrderCreateMail';
  }

  async handle({ data }) {
    const { deliverymanExist, recipientExist, deliveryOrder } = data;

    await Mail.sendMail({
      to: `${deliverymanExist.name}<${deliverymanExist.email}>`,
      subject: 'Detalhes da nova entrega',
      template: 'transportOrderCreateMail',
      context: {
        deliveryman: deliverymanExist.name,
        product: deliveryOrder.product,
        recipient: recipientExist.name,
        street: recipientExist.street,
        number: recipientExist.number,
        city: recipientExist.city,
        state: recipientExist.state,
      },
    });
  }
}

export default new TransportOrderCreateMail();
