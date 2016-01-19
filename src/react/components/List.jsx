var React = require("react");
var ListItem = require("./ListItem.jsx");

//This is simply TEST data, used to test that everything works.
var ingredients = [{id: 1, text: "hot-dog"}, {id: 2, text: "bacon"}, {id: 3, text: "burger"}];

var List = React.createClass({
    render: function () {
        var listItems = ingredients.map((ingredient) => {
            //At this point we are passing the ingredient text to our ListItem component.
           return <ListItem key={ingredient.id} ingredient={ingredient.text} />
        });
        return (
            <div>
                <ul>{listItems}</ul>
            </div>
        )
    }
});

module.exports = List;