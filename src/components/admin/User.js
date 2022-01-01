import React from "react";

export default function User() {
  return (
    <div className="m-4 pt-4 rounded bg-white h-screen w-full border-success border flex flex-col items-center sticky">
      <div className="m5 row w-90">
        <div className="col-md-7"></div>
        <div className="col-md-5">
          <input
            type="text"
            class="form-control"
            id="search_quizz"
            name="username"
            placeholder="検索"
          ></input>
        </div>

        <table className="mt-4 table table-hover text-center">
          <thead>
            <tr className="">
              <th>ID</th>
              <th>ユーザ名 </th>
              <th>グループ</th>
              <th>ポイント</th>
              <th>状態</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              <>
                <tr>
                  <td> 1</td>
                  <td> user</td>
                  <td> 高校生 </td>
                  <td> 1000</td>
                  <td className="text-danger"> 禁止</td>
                  <td>
                    <button type="button" class="btn btn-danger">
                      禁止
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-success">
                      アクティブ
                    </button>
                  </td>
                </tr>
                <tr>
                  <td> 1</td>
                  <td> user</td>
                  <td> 高校生 </td>
                  <td> 1000</td>
                  <td className="text-success"> アクティブ</td>

                  <td>
                    <button type="button" class="btn btn-danger">
                      禁止
                    </button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-success">
                      アクティブ
                    </button>
                  </td>
                </tr>
              </>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
