require("dotenv").config();
const knex = require("knex");

const knexInstance = knex({
  client: "pg",
  connection: process.env.DB_URL,
});

function searchItem(searchTerm) {
  knexInstance
    .select("name", "price", "date_added", "category")
    .from("shopping_list")
    .where("name", "ILIKE", `%${searchTerm}%`)
    .then((res) => {
      console.log(res);
    });
}

function paginate(pageNumber) {
  const numPerPage = 5;
  const offset = numPerPage * (pageNumber - 1);
  knexInstance
    .select("name", "price", "date_added", "category")
    .from("shopping_list")
    .limit(numPerPage)
    .offset(offset)
    .then((res) => {
      console.log(res);
    });
}

searchItem("burger");
paginate(3);


function productsAddedDaysAgo(daysAgo) {
  knexInstance
    .select('id', 'name', 'price', 'date_added', 'checked', 'category')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(results => {
      console.log(results);
    });
}

productsAddedDaysAgo(21);

function costPerCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result);
      
    });

}

costPerCategory();
