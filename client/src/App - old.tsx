import { Client, Databases } from "appwrite";
import React from "react";

function App() {
  const client = new Client();
  const APPWRITE_API_KEY =
    "95ae2c4733996e4d2332feea79cd61dce642bbbcb867d384288bb5e1d0b2b92d348aa16ca5d83506740639dcee8b7a4e92e1def919b5f51c8b3fcfdddc7fdd36a42acdcd5aa39d1d8d6bd1678091606fbaa0b03a6587ce8e473ba997d93cc73c1717d500411cdac0467dc74bae0f1efa3587c76d4579fe4a80e1edcd3efc04b5";

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65cf5b77595fe63904d1");

  const databases = new Databases(client);

  let promise = databases.listDocuments("main", "product");

  promise.then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
  return (
    <div className="">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
