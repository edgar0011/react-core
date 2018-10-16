// @flow

declare var jest: any
declare var it: any
declare var expect: any

type Message = {
  from: string,
  to: string,
  subject: string,
  type: number,
  text: string
}

type ILogger = {
  log(message: Message): void;
}

// ----------------------------------------------------------------------


const props: { message: Message } = {
  message: {
    from: 'Karel',
    to: 'Nadezda',
    subject: 'Hello',
    type: 0,
    text: 'This my hello to you, Nadezda. Regards, Karel'
  }
}

const sayHello = (logger: ILogger) => {
  logger.log(props.message)
}

// Tests

it('says HELLO', () => {
  const mockLogger: ILogger = {
    log: jest.fn()
  }

  const mockedCall = sayHello(mockLogger) // eslint-disable-line

  console.log(mockLogger.log) // eslint-disable-line
  console.log(mockLogger.log.mock) // eslint-disable-line
  console.log(mockLogger.log.mock.calls) // eslint-disable-line

  expect(mockLogger.log).toHaveBeenCalledWith(props.message)
})
