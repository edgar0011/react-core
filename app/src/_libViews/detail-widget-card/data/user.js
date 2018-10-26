const user = {
  user: {
    userId: 2502,
    title: 'Ing.',
    firstName: 'Test',
    lastName: 'User 2',
    userLanguage: 'sk',
    userStatus: 1,
    clientUserStatus: 1,
    bornDate: 1515584010000,
    cbsUserId: '1122334402',
    timestamp: '20180110123330960627000'
  },
  address: {
    street: 'Street',
    streetNumber: '23',
    city: 'Prague',
    zipCode: '11100',
    country: 'CZ',
    countryName: 'Czech Republic',
    phone: '+420123456789',
    email: 'user2@mail.cz'
  },
  contactAddress: null,
  document: null,
  loginName: null,
  webSocketDestination: null,
  access: {
    accessStatus: 1,
    loginName: {
      status: 1,
      loginName: '1122334402',
      loginNameAlias: 'TestUser2'
    },
    password: {
      lastChange: 1515588707000,
      cumulativeErrorsCount: 9,
      sequenceErrorsCount: 0,
      validity: null,
      validityDays: null
    },
    rightsRoles: {
      rightsProfile: 'User2',
      signingRole: '+14',
      rightsProfileId: 1811,
      signingRoleId: 2689,
      rightsProfileTimestamp: '20180731234728803605000',
      signingRoleTimestamp: '20180704105957009523000'
    },
    securityMethods: {
      authenticationMethods: [
        {
          methodId: 104,
          code: 'LN_PWD',
          strength: 20
        },
        {
          methodId: 106,
          code: 'LN_PWD_SMS',
          strength: 30
        }
      ],
      certificationMethods: [
        {
          methodId: 102,
          code: 'SMS',
          strength: 30
        }
      ],
      timestamp: '20180110124016180916000'
    },
    securityDeviceSMSOTP: {
      status: 1,
      otpPhoneNumber: '421906321123',
      cumulativeErrorsCount: 1,
      timestamp: '20180502075352284000000'
    },
    securityDeviceToken: null
  },
  canEditContact: true,
  usedAuthMethods: null
}

export default user
