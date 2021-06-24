<template>
  <div class="flex-2 flex flex-row h-full mt-8">
    <div class="flex-2 coupon-list">
      <div
        class="list-title flex flex-col justify-start gap-4 my-4 items-start"
      >
        <div class="flex flex-row  items-center gap-4">
          <div class="bg-plprimary px-2 py-2 rounded-full text-lg border-2">
              <img src="@/assets/add_white_24dp.svg" alt="" />
          </div>
          <button class="bg-plprimary px-4 py-2 rounded-lg text-lg">
            Fetch Coupons
          </button>
        </div>
      </div>
      <div>
        <table class="min-w-full table-auto">
          <thead class="justify-between h-14">
            <tr
              class="bg-opacity-5 border-black border-t-2 border-b-2 bg-gradient-to-tr from-gray-500 to-gray-300"
            >
              <th class="px-8 py-1">
                <span class="text-white text-xl">Code</span>
              </th>
              <th class="px-8 py-1">
                <span class="text-white text-xl">Start Date</span>
              </th>
              <th class="px-8 py-1">
                <span class="text-white text-xl">Finish Date</span>
              </th>

              <th class="px-8 py-1">
                <span class="text-white text-xl">Percentage</span>
              </th>

              <th class="px-8 py-1">
                <span class="text-white text-xl">Singile</span>
              </th>

              <th class="px-8 py-1">
                <span class="text-white text-xl">Action</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-200">
            <tr class="bg-white border-b-2 border-gray-200">
              <td class="px-16 py-2 flex flex-row items-center">
                <img
                  class="h-8 w-8 rounded-full object-cover "
                  src="https://randomuser.me/api/portraits/men/30.jpg"
                  alt=""
                />
              </td>
              <td>
                <span class="text-center ml-2 font-semibold">Dean Lynch</span>
              </td>
              <td class="px-16 py-2">
                <button
                  class="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
                >
                  Open Link
                </button>
              </td>
              <td class="px-16 py-2">
                <span>05/06/2020</span>
              </td>
              <td class="px-16 py-2">
                <span>10:00</span>
              </td>

              <td class="px-16 py-2">
                <span class="text-green-500">
                  <img src="@/assets/delete_black_24dp.svg" alt="" />
                </span>
              </td>
            </tr>
            <tr class="bg-white border-b-2 border-gray-200">
              <td class="px-16 py-2 flex flex-row items-center">
                <img
                  class="h-8 w-8 rounded-full object-cover "
                  src="https://randomuser.me/api/portraits/men/76.jpg"
                  alt=""
                />
              </td>
              <td>
                <span class="text-center ml-2 font-semibold">Ralph Barnes</span>
              </td>
              <td class="px-16 py-2">
                <button
                  class="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
                >
                  Open Link
                </button>
              </td>
              <td class="px-16 py-2">
                <span>05/06/2020</span>
              </td>
              <td class="px-16 py-2">
                <span>12:15</span>
              </td>

              <td class="px-16 py-2">
                <span class="text-yellow-500">
                  <img src="@/assets/delete_black_24dp.svg" alt="" />
                </span>
              </td>
            </tr>
            <tr class="bg-white border-b-2 border-gray-200">
              <td class="px-16 py-2 flex flex-row items-center">
                <img
                  class="h-8 w-8 rounded-full object-cover "
                  src="https://randomuser.me/api/portraits/men/38.jpg"
                  alt=""
                />
              </td>
              <td>
                <span class="text-center ml-2 font-semibold"
                  >Brett Castillo</span
                >
              </td>
              <td class="px-16 py-2">
                <button
                  class="bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black "
                >
                  Open Link
                </button>
              </td>
              <td class="px-16 py-2">
                <span>05/06/2020</span>
              </td>
              <td class="px-16 py-2">
                <span>08:35</span>
              </td>

              <td class="px-16 py-2">
                <span class="text-yellow-500">
                  <img src="@/assets/delete_black_24dp.svg" alt="" />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex-1 create-coupon"></div>
  </div>
</template>
<script>
export default {};
</script>
