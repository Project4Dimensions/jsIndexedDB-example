/* JSLint edition 2020-03-28 (jslint.com)
 * Assume…
 *   in development
 *   a browser
 * Global variables…
 *   Blob dataToggle formCreate formRetrieve formUpdate formDelete formSearch
 * ————
 * Search and see "Using IndexedDB - Web APIs | MDN"
 * IndexedDB example tested as follows:
 *   Google Chrome (version 80.0.3987)
 *   Google Chrome (version 80.0.3987, Android Pie 9.1.0.380)
 *   Firefox (version 73.0.1)
 *   Firefox (version 68.5.0, Android Pie 9.1.0.380)
 *   Safari (version 13.0.5)
 *   Safari iOS (version 10.3.3)
 */

const exampleData = [{
    "ssn": "444-44-4444",
    "name": "Bill Murray",
    "age": 35,
    "email": "bill@company.com"
}, {
    "ssn": "555-55-5555",
    "name": "Donna",
    "age": 32,
    "email": "donna@home.org"
}];

const nameIDB = "example";
const nameObj = "example";
let db;

function notIndexedDB() {
    "use strict";
    let alert = document.getElementById("alert");
    let alertOutput = document.getElementById("alertOutput");
    let a = document.createElement("a");
    alert.style.display = "block";
    alertOutput.appendChild(document.createTextNode(
        "This web app works with modern web browsers."
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "The Browse Happy website suggests suitable browsers."
    ));
    alertOutput.appendChild(document.createElement("br"));
    a.setAttribute("href", "http://browsehappy.com");
    a.setAttribute("class", "text-info");
    a.appendChild(document.createTextNode(
        "http://browsehappy.com"
    ));
    alertOutput.appendChild(a);
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "——"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "IndexedDB tested as follows:"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Google Chrome (version 80.0.3987)"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Google Chrome (version 80.0.3987, Android)"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Firefox (version 73.0.1)"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Firefox (version 68.5.0 Android)"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Safari (version 13.0.5)"
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "  • Safari iOS (version 10.3.3)"
    ));

    console.log(
        "This web app works with modern web browsers.\r\n" +
        "The Browse Happy website suggests suitable browsers.\r\n" +
        "http://browsehappy.com\r\n" +
        "——\r\n" +
        "IndexedDB tested as follows:\r\n" +
        "  • Google Chrome (version 80.0.3987)\r\n" +
        "  • Google Chrome (version 80.0.3987, Android)\r\n" +
        "  • Firefox (version 73.0.1)\r\n" +
        "  • Firefox (version 68.5.0 Android)\r\n" +
        "  • Safari (version 13.0.5)\r\n" +
        "  • Safari iOS (version 10.3.3)"
    );
}

function request_onerror() {
    "use strict";
    let alert = document.getElementById("alert");
    let alertOutput = document.getElementById("alertOutput");
    alert.style.display = "block";
    alertOutput.appendChild(document.createTextNode(
        "Your browser did not allow this web app to use IndexedDB."
    ));
    alertOutput.appendChild(document.createElement("br"));
    alertOutput.appendChild(document.createTextNode(
        "IndexedDB does not work in Firefox Private Browsing."
    ));

    console.log(
        "Your browser did not allow this web app to use IndexedDB.\r\n" +
        "IndexedDB does not work in Firefox Private Browsing."
    );
}

if (!window.indexedDB) {
    notIndexedDB();
}

let request = window.indexedDB.open(nameIDB, 1);

request.onerror = function () {
    request_onerror();
};

request.onsuccess = function () {
    "use strict";
    db = request.result;
    console.log("Opened database " + db);
};

request.onupgradeneeded = function (event) {
    "use strict";
    db = event.target.result;
    if (db.objectStoreNames.contains(nameObj)) {
        db.deleteObjectStore(nameObj);
    }

    let store = db.createObjectStore(
        nameObj,
        {keyPath: "ssn"}
    );

    store.createIndex("name", "name", {unique: false});
    store.createIndex("age", "age", {unique: false});
    store.createIndex("email", "email", {unique: false});

    exampleData.forEach(function (record) {
        store.add(record);
    });
};

function show(element) {
    "use strict";
    document.getElementById(element).style.display = "block";
}

function hide(element) {
    "use strict";
    document.getElementById(element).style.display = "none";
}

function clearNodes(element) {
    "use strict";
    let a = document.getElementById(element);
    while (a.childNodes[1]) {
        a.removeChild(a.childNodes[1]);
    }
}

function clearNodes2(element, num) {
    "use strict";
    let a = document.getElementById(element);
    while (a.children.length > num) {
        a.removeChild(a.lastChild);
    }
}

function output(id, text) {
    let elem = document.getElementById(id);
    let p = document.createElement("p");
    p.setAttribute("class", "card-text text-muted");
    p.setAttribute("style", "font-size:13px");
    p.appendChild(document.createTextNode(text));
    elem.appendChild(p);
}

function setForm(ssn, name, age, email, form) {
    "use strict";
    document.getElementById("ssn" + form).value = ssn;
    document.getElementById("name" + form).value = name;
    document.getElementById("age" + form).value = age;
    document.getElementById("email" + form).value = email;
}

function create() {
    "use strict";
    const transaction = db.transaction([nameIDB], "readwrite");
    const store = transaction.objectStore(nameObj);
    let formSsnCreate = formCreate.ssnCreate.value.trim();
    let formNameCreate = formCreate.nameCreate.value.trim();
    let formAgeCreate = formCreate.ageCreate.value.trim();
    let formEmailCreate = formCreate.emailCreate.value.trim();
    let req = store.add({
        "ssn": formSsnCreate,
        "name": formNameCreate,
        "age": formAgeCreate,
        "email": formEmailCreate
    });

    req.onerror = function () {
        output(
            "outputCreate",
            "Record is in the object store."
        );
        console.log("Record is in the object store.");
    };

    req.onsuccess = function () {
        output(
            "outputCreate",
            "Record created."
        );
        console.log("Record created.");
    };
}

function retrieve() {
    "use strict";
    const transaction = db.transaction([nameIDB]);
    const store = transaction.objectStore(nameObj);
    let formSSN = formRetrieve.ssnRetrieve.value.trim();
    let elem = document.getElementById("outputRetrieve");
    let req = store.get(formSSN);

    function fmtOutput(param) {
        let p = document.createElement("p");
        let a1 = document.createElement("a");
        let a2 = document.createElement("a");
        p.setAttribute("class", "card-text text-muted");
        p.setAttribute("style", "font-size:13px");
        a1.setAttribute("href", "#contentUpdate");
        a1.setAttribute(
            "onclick",
            "setForm('" +
            param.result.ssn + "','" +
            param.result.name + "','" +
            param.result.age + "','" +
            param.result.email + "','" +
            "Update');" +
            "document.getElementById('navUpdate').click();"
        );
        a1.setAttribute("data-toggle", dataToggle);
        a1.setAttribute("class", "text-muted font-weight-bolder");
        a1.appendChild(document.createTextNode(
            "update " + param.result.ssn
        ));
        a2.setAttribute("href", "#contentDelete");
        a2.setAttribute(
            "onclick",
            "setForm('" +
            param.result.ssn + "','" +
            param.result.name + "','" +
            param.result.age + "','" +
            param.result.email + "','" +
            "Delete');" +
            "document.getElementById('navDelete').click();"
        );
        a2.setAttribute("data-toggle", dataToggle);
        a2.setAttribute("class", "text-muted font-weight-bolder");
        a2.appendChild(document.createTextNode(
            "delete " + param.result.ssn
        ));
        p.appendChild(document.createTextNode(
            "ssn: " + param.result.ssn
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "name: " + param.result.name
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "age: " + param.result.age
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "email: " + param.result.email
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(a1);
        p.appendChild(document.createElement("br"));
        p.appendChild(a2);
        elem.appendChild(p);
    }

    req.onsuccess = function (evt) {
        let record = evt.target.result;
        if (record === undefined) {
            output(
                "outputRetrieve",
                "Record is not in the object store."
            );
            console.log(
                "Record is not in the object store."
            );
        } else {
            fmtOutput(req);
            console.log(
                "{\r\n" +
                "    ssn: " + req.result.ssn + ",\r\n" +
                "    name: " + req.result.name + ",\r\n" +
                "    age: " + req.result.age + ",\r\n" +
                "    email: " + req.result.email + "\r\n" +
                "}"
            );
        }
    };
}

function update() {
    "use strict";
    const transaction = db.transaction([nameIDB], "readwrite");
    const store = transaction.objectStore(nameObj);
    let formSsnUpdate = formUpdate.ssnUpdate.value.trim();
    let formNameUpdate = formUpdate.nameUpdate.value.trim();
    let formAgeUpdate = formUpdate.ageUpdate.value.trim();
    let formEmailUpdate = formUpdate.emailUpdate.value.trim();
    let req = store.get(formSsnUpdate);

    req.onerror = function () {
        output(
            "outputUpdate",
            "Error getting record."
        );
        console.log("Error getting record.");
    };

    req.onsuccess = function (evt) {
        let record = evt.target.result;
        if (record === undefined) {
            output(
                "outputUpdate",
                "Record is not in the object store."
            );
            console.log(
                "Record is not in the object store."
            );
            return;
        }

        record.name = formNameUpdate;
        record.age = formAgeUpdate;
        record.email = formEmailUpdate;

        let reqUpdate = store.put(record);
        reqUpdate.onerror = function (evt) {
            output(
                "outputUpdate",
                "Error updating record."
            );
            console.error(
                "Error updating record: " + evt.target.errorCode + "."
            );
        };
        reqUpdate.onsuccess = function (evt) {
            output(
                "outputUpdate",
                "Record updated."
            );
            console.log(
                "Record updated: " + evt + ", " + evt.target + "."
            );
        };
    };
}

function deleteRecord() {
    "use strict";
    const transaction = db.transaction([nameIDB], "readwrite");
    const store = transaction.objectStore(nameObj);
    let formSsnDelete = formDelete.ssnDelete.value.trim();
    let req = store.get(formSsnDelete);

    req.onerror = function () {
        output(
            "outputDelete",
            "Error getting record."
        );
        console.log(
            "Error getting record."
        );
    };

    req.onsuccess = function (evt) {
        let record = evt.target.result;
        if (record === undefined) {
            output(
                "outputDelete",
                "Record is not in the object store."
            );
            console.log(
                "Record is not in the object store."
            );
            return;
        }
        let reqDelete = store.delete(formSsnDelete);
        reqDelete.onerror = function (evt) {
            output(
                "outputDelete",
                "Error deleting record."
            );
            console.error(
                "Error deleting record: " + evt.target.errorCode + "."
            );
        };
        reqDelete.onsuccess = function (evt) {
            output(
                "outputDelete",
                "Record deleted."
            );
            console.log(
                "Record deleted: " + evt + ", " + evt.target + "."
            );
        };
    };
}

function search() {
    "use strict";
    const transaction = db.transaction([nameIDB]);
    const store = transaction.objectStore(nameObj);
    const indexName = store.index("name");
    let formSSN = formSearch.ssnSearch.value.trim();
    let formName = formSearch.nameSearch.value.trim();
    let formAge = formSearch.ageSearch.value.trim();
    let formEmail = formSearch.emailSearch.value.trim();
    let formAll = formSearch.all.value;
    let keyRangeValue = window.IDBKeyRange.bound(formName, formName);
    let elem = document.getElementById("outputSearch");
    let text = [];
    if (formAge.length === 0) {
        formAge = 100;
    }

    function fmtOutput(param, txt) {
        let p = document.createElement("p");
        let a1 = document.createElement("a");
        let a2 = document.createElement("a");
        p.setAttribute("class", "card-text text-muted");
        p.setAttribute("style", "font-size:13px");
        a1.setAttribute("href", "#contentUpdate");
        a1.setAttribute(
            "onclick",
            "setForm('" +
            param.key + "','" +
            param.value.name + "','" +
            param.value.age + "','" +
            param.value.email + "','" +
            "Update');" +
            "document.getElementById('navUpdate').click();"

        );
        a1.setAttribute("data-toggle", dataToggle);
        a1.setAttribute("class", "text-muted font-weight-bolder");
        a1.appendChild(document.createTextNode(
            "update " + param.key
        ));
        a2.setAttribute("href", "#contentDelete");
        a2.setAttribute(
            "onclick",
            "setForm('" +
            param.key + "','" +
            param.value.name + "','" +
            param.value.age + "','" +
            param.value.email + "','" +
            "Delete');" +
            "document.getElementById('navDelete').click();"
        );
        a2.setAttribute("data-toggle", dataToggle);
        a2.setAttribute("class", "text-muted font-weight-bolder");
        a2.appendChild(document.createTextNode(
            "delete " + param.key
        ));
        p.appendChild(document.createTextNode(
            "ssn: " + param.key
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "name: " + param.value.name
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "age: " + param.value.age
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(document.createTextNode(
            "email: " + param.value.email
        ));
        p.appendChild(document.createElement("br"));
        p.appendChild(a1);
        p.appendChild(document.createElement("br"));
        p.appendChild(a2);
        elem.appendChild(p);
        txt.push(
            "{\r\n" +
            "    ssn: " + param.key + ",\r\n" +
            "    name: " + param.value.name + ",\r\n" +
            "    age: " + param.value.age + ",\r\n" +
            "    email: " + param.value.email + "\r\n" +
            "}"
        );
        text.push(txt);
    }

    indexName.getAll(keyRangeValue).onsuccess = function (evt) {
        console.log(JSON.stringify(evt.target.result));
    };

    store.openCursor().onsuccess = function (evt) {
        let cursor = evt.target.result;
        console.log("Processing records.");
        let txt = [];
        if (cursor) {
            if (
                formAll === "retrieveAll"
            ) {
                fmtOutput(cursor, txt);
            } else if (
                cursor.value.ssn.indexOf(formSSN) !== -1 &&
                cursor.value.name.indexOf(formName) !== -1 &&
                cursor.value.age <= parseInt(formAge, 10) &&
                cursor.value.email.indexOf(formEmail) !== -1
            ) {
                fmtOutput(cursor, txt);
            }
            cursor.continue();
        } else {
            console.log("No more records!");
        }
    };

    transaction.oncomplete = function () {
        console.log(text.join(",\r\n"));
    };
}

function downloadData() {
    "use strict";
    const transaction = db.transaction([nameIDB]);
    const store = transaction.objectStore(nameObj);

    store.getAll().onsuccess = function (evt) {
        let text = JSON.stringify(evt.target.result);
        let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
        let url = window.URL || window.webkitURL;
        let link = url.createObjectURL(blob);
        let a = document.createElement("a");
        a.download = "data.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    transaction.oncomplete = function () {
        output(
            "outputDownload",
            "Carried out data download process."
        );
        console.log(
            "Carried out data download process."
        );
    };
}
