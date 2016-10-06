var app = angular.module('myApp', []);

app.controller('myAppCtrl', ['$scope', '$http', function ($scope, $http) {

  $scope.message = '';
  $scope.newContact = {};
  $scope.myContacts = [];
  $scope.myOriginalEditContacts = [];

  $scope.clearContact = function () {
    $scope.newContact = {
      _id: '',
      name: '',
      telephone: '',
      isEditing: false
    };
  };

  $scope.clearContact();

  $scope.isValidContact = function (contact) {

    $scope.messages = [];

    if (typeof contact.name === typeof undefined || contact.name.length === 0) {
      $scope.messages.push('Name is required.');
    }

    if (typeof contact.telephone !== typeof undefined) {

      if (!$scope.isValidPhoneNumber(contact.telephone)) {
        $scope.messages.push('Please enter a valid telephone number format, examples:'
          + '123-456-7890 | '
          + '(123) 456-7890 | '
          + '123 456 7890 | '
          + '123.456.7890 | '
          + '+91 (123) 456-7890');
      }
    } else {
      $scope.messages.push('Telephone number is required.');
    }

    if ($scope.messages.length > 0) {
      return false;
    }

    return true;
  }

  $scope.isValidPhoneNumber = function (phoneNumber) {
    // match phone number regex http://stackoverflow.com/questions/16699007/regular-expression-to-match-standard-10-digit-phone-number
    if (phoneNumber.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/)) {
      return true;
    }
    return false;
  };

  $scope.saveContact = function () {

    if ($scope.isValidContact($scope.newContact)) {
      var lastContact = $scope.myContacts[$scope.myContacts.length - 1];
      $scope.newContact._id = 0;

      if (typeof lastContact !== typeof undefined) {
        $scope.newContact._id = lastContact._id + 1;
      }

      $scope.myContacts.push($scope.newContact);

      $scope.clearContact();
    }
  };

  $scope.removeContact = function (id) {
    var contactToRemove = $scope.findContactById(id);

    if (contactToRemove) {
      $scope.myContacts = $scope.myContacts.filter(function (contact) {
        return contact._id !== contactToRemove._id;
      });
    }
  };

  $scope.editContact = function (contact) {
    var tempContact = angular.copy(contact);
    $scope.myOriginalEditContacts.push(tempContact);
    contact.isEditing = true;
  };

  $scope.updateContact = function (contact) {

    if ($scope.isValidContact(contact)) {
      $scope.myOriginalEditContacts = $scope.myOriginalEditContacts.filter(function (myEditContact) {
        return myEditContact._id !== contact._id;
      });

      contact.isEditing = false;
    }
  };

  $scope.cancelUpdate = function (contact) {
    var originalContact = $scope.getUnmodifiedContact(contact);

    if (typeof originalContact !== typeof undefined) {
      contact.name = originalContact.name;
      contact.telephone = originalContact.telephone;
    }

    $scope.myOriginalEditContacts = $scope.myOriginalEditContacts.filter(function (myEditContact) {
      return myEditContact._id !== contact._id;
    });

    contact.isEditing = false;
  };

  $scope.getUnmodifiedContact = function (contact) {
    return $scope.myOriginalEditContacts.find(function (findContact) {
      return findContact._id == contact._id;
    });
  };

  $scope.findContactById = function (id) {
    return $scope.myContacts.find(function (contact) {
      return contact._id === id;
    });
  };

  $scope.findContactByNameAndPhone = function (name, phone) {
    return $scope.myContacts.find(function (contact) {
      return contact.name === name && contact.telephone === phone;
    });
  };

}]);
