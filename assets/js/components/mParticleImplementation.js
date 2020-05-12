let mParticleSnippedCode = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const customerId = urlParams.get('id');

    let userDataForm = document.getElementById('dq-form');

    if(userDataForm) {
        document.getElementsByName('customerId')[0].value = customerId;
    }

    window.mParticle = {
        config: {
            isDevelopmentMode: true,
            identifyRequest: {
                userIdentities: {
                    customerid: customerId,
                }
            },
        }
    };

    (
        function(t){window.mParticle=window.mParticle||{EventType:{Unknown:0,Navigation:1,Location:2,Search:3,Transaction:4,UserContent:5,UserPreference:6,Social:7,Other:8}};window.mParticle.eCommerce={Cart:{}};window.mParticle.Identity={};window.mParticle.config=window.mParticle.config||{};window.mParticle.config.rq=[];window.mParticle.ready=function(t){window.mParticle.config.rq.push(t)};function e(e,o){return function(){if(o){e=o+"."+e}var t=Array.prototype.slice.call(arguments);t.unshift(e);window.mParticle.config.rq.push(t)}}var o=["endSession","logError","logEvent","logForm","logLink","logPageView","setSessionAttribute","setAppName","setAppVersion","setOptOut","setPosition","startNewSession","startTrackingLocation","stopTrackingLocation"];var n=["setCurrencyCode","logCheckout"];var i=["identify","login","logout","modify"];o.forEach(function(t){window.mParticle[t]=e(t)});n.forEach(function(t){window.mParticle.eCommerce[t]=e(t,"eCommerce")});i.forEach(function(t){window.mParticle.Identity[t]=e(t,"Identity")});var r=document.createElement("script");r.type="text/javascript";r.async=true;r.src=("https:"==document.location.protocol?"https://jssdkcdns":"http://jssdkcdn")+".mparticle.com/js/v2/"+t+"/mparticle.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c);}
    )("cec25ef1b3948b4aaf1c34632f4da0d6");

    return customerId
};

export default mParticleSnippedCode;