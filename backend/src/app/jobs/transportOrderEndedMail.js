import Mail from '../../lib/Mail';

class TransportOrderEndedMail {
  get key() {
    return 'transportOrderEndedMail';
  }

  async handle({ data }) {
    const { toEmail } = data;

    await Mail.sendMail({
      to: `${toEmail.deliveryman.name}<${toEmail.deliveryman.email}>`,
      subject: `Entrega ${toEmail.id} finalizada`,
      template: 'transportOrderEndedMail',
      context: {
        deliveryman: toEmail.deliveryman.name,
        deliveryOrder_id: toEmail.id,
        product: toEmail.product,
        recipient: toEmail.recipient.name,
        street: toEmail.recipient.street,
        number: toEmail.recipient.number,
        complement_address: toEmail.recipient.complement_address,
        city: toEmail.recipient.state,
        state: toEmail.recipient.city,
        zip_code: toEmail.recipient.zip_code,
      },
    });
  }
}

export default new TransportOrderEndedMail();
