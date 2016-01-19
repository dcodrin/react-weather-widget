var React = require("react");

var ListItem = React.createClass({
    render: function () {
        return (
            <div>
                <li>
                    {/*The ingredient will be passed down from the parent*/}
                    <h4>{this.props.ingredient}</h4>
                </li>
            </div>
        )
    }
});

module.exports = ListItem;