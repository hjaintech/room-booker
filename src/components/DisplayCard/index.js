import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const styles = {
  card: {
    width: 275,
    marginRight: 40
  },
};

function DisplayCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardHeader title={props.title} />
      <CardContent>
          {
              props.data.map((item) => {
                return (
                <div>
                  {item.label}: {item.value}
                </div>);
              })
          }
      </CardContent>
    </Card>
  );
}

DisplayCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default withStyles(styles)(DisplayCard);
