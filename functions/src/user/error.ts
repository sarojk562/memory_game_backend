export const userError = {
  auth: {
    loginerror: {
      name: 'User Login Error',
      code: 10101,
      message: 'User is not logged in. Please login to get the details.'
    },
    missingsignupdata: {
      name: 'User Signup Error',
      code: 10102,
      message: 'Error while signing up. Required fields missing'
    },
    roleerror: {
      name: 'User Role Error',
      code: 10103,
      message: 'Invalid Role. Send correct role information'
    },
    signupfirebaseerror: {
      name: 'User Signup Error',
      code: 10104,
      message: 'Error while creating user'
    },
    norole: {
      name: 'User Role Error',
      code: 10105,
      message: 'No Role !'
    }
  },
  validation: {
    missingfield: {
      name: 'User Validation Error',
      code: 10110,
      message: 'Required data missing'
    },
    missingshowid: {
      name: 'User Validation Error',
      code: 10111,
      message: 'Please provide show id'
    },
    wrongfield: {
      name: 'User Validation Error',
      code: 10112,
      message: 'Invalid data. Send correct data information'
    },
    mobilenumberexists: {
      name: 'User Validation Error',
      code: 10113,
      message: 'The user with the provided phone number already exists'
    },
    emailexists: {
      name: 'User Validation Error',
      code: 10114,
      message: 'The user with the provided E-mail address already exists'
    }
  },
  db: {
    missingData: {
      name: 'User Error',
      code: 10201,
      message: 'No data found'
    },
    norole: {
      name: 'User Error',
      code: 10202,
      message: 'Role is not avilable'
    },
    userNotPartOfShow: {
      name: 'User Error',
      code: 10203,
      message: 'You are not part of the show'
    },
    nouser: {
      name: 'User Error',
      code: 10204,
      message: "User doesn't exist"
    },
    userInvitedWithGivenRole: {
      name: 'User Error',
      code: 10205,
      message: 'User already invited to the show with given role'
    },
    noshowadminrole: {
      name: 'User Error',
      code: 10206,
      message: 'User is not showadmin'
    },
    noActiveUser: {
      name: 'User Error',
      code: 10207,
      message: 'User is not active'
    },
    noteamadminrole: {
      name: 'User Error',
      code: 10208,
      message: 'User is not teamadmin'
    }
  },
  permission: {
    noaccess: {
      name: 'User Permission Error',
      code: 10901,
      message: 'You dont have access to perform the action'
    }
  }
}
