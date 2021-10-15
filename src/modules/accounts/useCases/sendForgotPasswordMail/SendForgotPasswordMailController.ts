import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMail } from './SendForgotPasswordMail';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMail = container.resolve(SendForgotPasswordMail);
    await sendForgotPasswordMail.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
