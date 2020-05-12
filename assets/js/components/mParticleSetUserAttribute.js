let mParticleSetUserAttributes = function()  {

    let currentUser = mParticle.Identity.getCurrentUser();

    currentUser.setUserAttribute('$FullName', document.getElementsByName('fullName')[0].value);
    currentUser.setUserAttribute('$Mobile', document.getElementsByName('phone')[0].value);
    currentUser.setUserAttribute('$Address', document.getElementsByName('mailingAddress')[0].value);
    currentUser.setUserAttribute('$City', document.getElementsByName('city')[0].value);
    currentUser.setUserAttribute('$State', document.getElementsByName('state')[0].value);
    currentUser.setUserAttribute('$Zip', document.getElementsByName('zip-code')[0].value);
    currentUser.setUserAttribute('$SweepsEmail', document.getElementsByName('emailAddress')[0].value);

    mParticle.Identity.modify(currentUser);
};

export default mParticleSetUserAttributes;