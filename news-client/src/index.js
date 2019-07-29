import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import Moment from 'react-moment';
import { AlertDialog } from './dialog';
import { getNews } from './news/newsService';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    titleContainer: {
        backgroundColor: '#000',
        padding: theme.spacing(8, 5, 6),
        color: '#fff',
    },
    gridList: {
        height: '100%',
    },
    row: {
        backgroundColor: '#fff',
        border: '1px',
        borderColor: '#ccc',
        padding : 10,
        '&:hover': {
            cursor: 'pointer',
            background: "#fafafa",
         },
    },
    rowNoLink: {
        backgroundColor: '#fff',
        border: '1px',
        borderColor: '#ccc',
        padding : 10,
    },
    tableCellTitle: {
        fontSize: '13px',
        color: '#333',
    },
    tableCellAuthor: {
        fontSize: '13px',
        color: '#999',
        marginLeft : '10px',        
    },
  }),
);

function App() {
    const classes = useStyles();

    const [nodeNews, setNodeNews] = useState([]);
    let [nodeNewDeleted, setNodeNewDeleted] = useState(null);

    const calendarStrings = {
        lastDay : '[Yesterday]',
        sameDay : 'LT',
        lastWeek : 'MMM D',
        sameElse : 'MMM D',
    };

    const openNewLink = (link) => {
        if(link) {
            window.open(link, "_blank");
        }
    };

    const wasDeleted = (id) => {
        setNodeNewDeleted(nodeNewDeleted = id);
    };

    useEffect(() => {
        getNews((newsE) => {
            setNodeNews(newsE);
        });
    }, [nodeNewDeleted]);    

    return (    
        <React.Fragment>
            <CssBaseline />
            <div >
                <Container className={classes.titleContainer}>
                    <Typography component="h1" variant="h2" align="left">
                    HN Feed
                    </Typography>
                    <Typography variant="h5" align="left" paragraph>
                        We &lt;3 hacker news!
                    </Typography>
                </Container>
            </div>

            <Paper>
                <Container>
                    <Table>
                        <TableBody>
                        {nodeNews.map(nodeNew => (
                            <TableRow 
                                key={nodeNew._id} 
                                className={nodeNew.url ? classes.row : classes.rowNoLink}
                            >
                                <TableCell 
                                    onClick={() => openNewLink(nodeNew.url)}>
                                    <span className={classes.tableCellTitle}>{nodeNew.title}.</span> 
                                    <span className={classes.tableCellAuthor}>- {nodeNew.author} -</span>
                                </TableCell>                        
                                <TableCell onClick={() => openNewLink(nodeNew.url)}>
                                    <Moment calendar={calendarStrings}>
                                        {nodeNew.createdAt}
                                    </Moment>
                                </TableCell>
                                <TableCell>
                                    <AlertDialog nodeNew={nodeNew} onClick={(id) => wasDeleted(id)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Container>
            </Paper>            
            
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));