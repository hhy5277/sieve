/*
 * The content of this file is licenced. You may obtain a copy of the license
 * at http://sieve.mozdev.org or request it via email from the author. 
 *
 * Do not remove or change this comment.
 * 
 * The initial author of the code is:
 *   Thomas Schmid <schmid-thomas@gmx.net>
 *      
 */
 
// Enable Strict Mode
"use strict"

const EXPORTED_SYMBOLS = [ "SieveAccountManagerComponent"];


const Cc = Components.classes;
const Ci = Components.interfaces; 
const Cr = Components.results; 

    
  //class constructor
  function SieveAccountManagerExtension() {};
 
  // class definition
  SieveAccountManagerExtension.prototype = 
  {
    classID : Components.ID("{87f5b0a0-14eb-11df-a769-0002a5d5c51b}"),
    contactID : "@mozilla.org/accountmanager/extension;1?name=sieve.mozdev.org",
    classDescription: "Sieve Account Manager Extension",
  
    name : "sieve-account",  
    chromePackageName : "sieve",
    showPanel: function(server) 
    {
      if (server.type == "imap")
        return true;
      
      if (server.type == "pop3")
        return true;
      
      return false;
    },

    QueryInterface: function(aIID)
    {
      if (!aIID.equals(Components.interfaces.nsIMsgAccountManagerExtension) 
            && !aIID.equals(Components.interfaces.nsISupports))
        throw Components.results.NS_ERROR_NO_INTERFACE;
        
      return this;
    }
  };

  const SieveAccountManagerFactory = 
  {
    _singleton: null,    
    createInstance: function (outer, iid)
    {
      if (outer != null)
        throw Cr.NS_ERROR_NO_AGGREGATION;

      if (this._singleton == null)
        this._singleton = new SieveAccountManagerExtension();
       
      return this._singleton.QueryInterface(iid);
    },
     
    QueryInterface: function (iid)
    {
      if (iid.equals(Ci.nsIFactory) ||  iid.equals(Ci.nsISupports))
        return this;
      
      throw Cr.NS_ERROR_NO_INTERFACE;
    }
  };

  
const SieveAccountManagerComponent = {
  load : function() 
  {  
    var compMgr = Components.manager.QueryInterface(Ci.nsIComponentRegistrar);
    compMgr.registerFactory(
        SieveAccountManagerExtension.prototype.classID,
        SieveAccountManagerExtension.prototype.classDescription,
        SieveAccountManagerExtension.prototype.contactID,
        SieveAccountManagerFactory);
    
    
    var catMgr = Components.classes["@mozilla.org/categorymanager;1"]
                   .getService(Ci.nsICategoryManager);
                
    catMgr.addCategoryEntry(
        "mailnews-accountmanager-extensions",
        SieveAccountManagerExtension.prototype.classDescription,
        SieveAccountManagerExtension.prototype.contactID,
        false, true); 
  }, 

  unload : function() 
  {
    var compMgr = Components.manager.QueryInterface(Ci.nsIComponentRegistrar); 
    compMgr.unregisterFactory(
        SieveAccountManagerExtension.prototype.classID, 
        SieveAccountManagerFactory);
     
    var catMgr = Components.classes["@mozilla.org/categorymanager;1"]
                   .getService(Ci.nsICategoryManager);
    catMgr.deleteCategoryEntry(
        "mailnews-accountmanager-extensions",
        SieveAccountManagerExtension.prototype.classDescription,
        false);
  }
}