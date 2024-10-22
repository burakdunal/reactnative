import { FlatList, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

// function renderCategoryItem(item){
//   return;
// }


function CategoriesScreen({navigation}) {
  function pressHandler(item) {
    navigation.navigate('MealsOverview', {
      categoryId: item.id,
    });
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={({ item }) => (
        <CategoryGridTile key={item.id} title={item.title} color={item.color} onPress={pressHandler.bind(this, item)} />
      )}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
