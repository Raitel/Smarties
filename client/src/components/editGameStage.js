import React, { useState, useReducer, useEffect} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';


const useStyles = makeStyles((theme) => ({
    background:{
        backgroundImage: `url(https://z3.ax1x.com/2021/05/02/gZaj2Q.png)`,
        //background: 'linear-gradient(45deg, #2d3436 30%, #d3d3d3 90%)',
        width:'1200px',
        height:'800px',
        marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    backgroundScore:{
        backgroundImage: `url(https://z3.ax1x.com/2021/05/02/gZaj2Q.png)`,
        //background: 'linear-gradient(45deg, #2d3436 30%, #d3d3d3 90%)',
        width:'1200px',
        height:'800px',
        //marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    progressBar:{
        height:'50px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'       
    },
    questionSection:{
        height:'150px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'       
    },
    stageCount:{
        marginTop:'10px',
        height:'200px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black',
        //boxShadow: '1px 1px'       
    },
    stageImage:{
        backgroundImage: `url(https://z3.ax1x.com/2021/05/02/gZaX8g.png)`,
        height:'75px',
        width: '325px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column', 
        //boxShadow: '1px 1px'    
    },
    questionImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/g1m2SUcCl1nJ5y4ySh4blWmEA0MpXOpatOEvcj6SCngWcN-2ITlWfGpu0CBPhM-ed3ZBxAMMNiT3whgURRcLe9v1otRG9HyNuNWS8acdPQXmLKUSrw_-gBxO2iTGrTBQ03yrBcuiyEemZtKsIm3UcjanL_WX95RgWYA6yuiAEe_YrTBkUr_ms0SdxRiy0UVIn8QqrY9jX38KNc5pMNyPKZ8AHNm4I9OLwMpHVLbqZL_2pGB5YSV-ZZ1Rx2Csa0Ul2DRh9o7GxqtcMHXt54lNs0w-ivtJMXbcnElJjyZZ2l8VFc-E6KQ2DwYFdBrbwyQJ--lik70R4c69gJ-0H644EOspFnK3LbkRfE2fcXs-LdLx4-2m8GH57oB4u3DtxsJw6-dOgv1Soothlkkb7f76IDvwSoMH1zDKg4O7HsNHYIyxUovk6_dYle4n39J3bB97UIzFrg4hGxkqtLENuSSntRTLj6IKb55EgAyI_2ErSN0aU6FFMN0rky5MI6d9KzzvAyzPIcBZ0Gb8ZmXdCYRIyoRB2XBCZeFqdlqRN25PteZS9S-0VkdbR1vUcI8460fQRkS-mq838R1rdYFey_5MooBmgZhHUCf6fNEvHNVAkCqPdmq-FfQTty2xVQwO3dRD7lJm1GiilrPRwTv4oVyX8GVJ0a813qSZ96hnMpbD7OgDrEZYh5K3C95ygDxSvQ5zctDGKnizuGWP1RedIGCQGyM=w600-h131-no?authuser=0)`,
        background: 'linear-gradient(45deg, #fc5296 30%, #f67062 90%)',
        height:'131px',
        width: '600px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        borderRadius: '10px'
    }, 
    tipSection:{
        height:'150px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'       
    },
    tipImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/oaiqkzi7sbrCnDLHtdb5mVkH6ld6ZDPPdCTIMt5ZG08popkSf7QE7kwSiVoZFJ4p1LL1aCAwK6NsRZGT1LIJSNoMnP9ht0oPdp8EznBRp9YyP4V0lcTsurZdsfGlRs1KdvSfyDLB68RFbket73cGrvptVMKE09h_xALNzPwbmpRWKlro69RpbMkdAWyMltQtPF44VL493uf_f2qQ-haHRY4YSvImrof99VcRegoUGaqqk1VnrbRgUYQuDsyIRSWunlhhkblW1oxH0uPsAGRblEWd8maAgjbeB7-H8Km2rmbQKq70tWDSbsLyZwMGxBhHANt8jzrVZ6Y_7ZH00djXFl9kPXMMFscgZjacoRIE95N9Yp96KXN6reQmkI7RY1fBzjnH5UYQLO935IU_i9RwNIXbd04cksRVhc78p88fP4qMR0bpK9bQ1YIA4cGomr4rbYEHnDSAslreBxBdo94p5pgCQTGdhPBbGNtoc8jG_Tb7E0GUKHGC21XKL3JCCSleSgUzVm2aOfLBRytQOO-fwlifQin8LDybAGDSkmMbNQMnV88-B8BKwn9mTsHTqgw1vze1bdTlZbM0Pep3GgToa78thbYg8LX02rbT5-5ArnWkrPIFWGXMeQWPSArBlrMOxpkoRR4md_Jd4_RQhOL8XjWBrwsDRUBgVonUwKZvCDSzp4I-m3Xh4_H_b5Z1m0iyo6P9zR2dkmy3R8ujoVQey_Q=w65-h95-no?authuser=0)`,
        background: 'linear-gradient(45deg, #fbb034 30%, #ffdd00 90%)',
        height:'95px',
        width: '65px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'20px',
        marginRight:'20px',
        borderRadius: '10px'
    }, 
    tipExpandedImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/fl2JQtt5pzW1YzfLAQO-dYdgo5Xaq2mnYekTbrzSsJTPFsH0Cr3F246-pKzsN5h8xc5UoXr1uco-2d3etljMssljy8sLGGCE0qYYm2tv1cpO4fUQxGcyEbx2Mv-rNFDpozkkdrKNvYBzh-hvlDNIl9cKq9YGkf4l1JgN1gE6LFwmJJqEiP7HCcGeP_bNBbT2zaVlZvQfzElx3JJZLWEOYxjet-KmL77EjmS63LmbSq8RzVAc4d_ZvQvABKo09zR1BqCGqTfycc1JKChLpqaD7yshYztehpzdcWxxfiVYLvzyPL2TqcErZk1rJ14RYrOuUloXxrTq4S9BLn5fvZRlLSmNBN7Qq1I--83g0MN2s14JrD010e2G6SirgmE_8TWWkX7PRmcedaOhvbaFzcj-29k4GFgnKvkJIv4e5WPytPCyDBfr-846l2tGF7ObB2F4AwKwYj8rd8ZAoSmVd9ZjJvCWGNWFeHaasZoJjAAb2SP58rMdZA06v4dqPZQsnuXxrhw-u7EiGCCUR62H-9QwuJkCYUs-0o-M5n7KQtk5Sl6tTS4ejd5V6GUnwNXt1E5_7Hx9CdVztVHsC2S7aN7B9Fj85cfK3F4_XKRaLkKsdOYX_V37zklLNwHiRu9EAK9wE5JrVw1YqF7yDEdfZu8eINBhlgwdHuatiKa7NpUfOyOhSEVLUgBCFvnrn809vzWC-aIjvKwIHJy2xct0eD8Ijkw=w400-h95-no?authuser=0)`,
        background: 'linear-gradient(45deg, #fcba29 30%, #fbb034 90%)',
        height:'95px',
        width: '400px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'20px',
        marginRight:'20px',
        borderRadius: '10px'
    },
    multipleChoiceAnswerImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/v3d5H5kVAW3JEqEcszLFIezk6A2_2AdAT9_a2zHXUysUuLnEWAKNfLA-68LcWBkFTAFvLSOwTa_jJiTArzqAMuZRVTrcA5pYBPsUclV3ovODfSqpJGLTbWDnvf9dCJyn31An0z5jnoPmEpe6vzGjBfisUFmDL0Kf3GAHfwfbvVMrllwxpCu1rFdLacxzoTq2lqTcIgKzUa132NHwJIIEq9Qsm6gGOhVCeTWRhMiyVtyD0Wh2wkFq0FJdnmAHYVYbdtUm8L3tD-tsaM4h6h4Vxn8rnfejRlS75DCXvq_O6H9yM-KbTnjX_av3vmPA4SknD6AELTECOtShUJXiEHVOtSID-NRumxRt_-mv2medd9TyOoCCbpGXixnYlLGnEW7qFLmh2Tidv69zcAsEsVvKtWXKu1z0pi0bdFWhGE9H7CPAXkqmfNgnsyM5wyDyYVPG4dm_6_sokjRWK0SgECrVWHurJ_ra1XlM-rq4xE0rt3ko2-Jv_91n4nWBfWLowYlpIistDBv0I4flH2ndAhwkZGTni6wFCl7p0kSWWrDP-pl0-J_6jHfg1EB5omJEXMuwZWvMtkKT-6imPlPx-csLIus2V2cLDI-TPt4yUqFafRU7uGJQ7BehaRrTpJYPh6PRS4IUT7rKLlSSG1TyvE9EMLQurAEpo4TWLC1dRyylWeJHRh0gdkfM-8BHfjfqPXBua4A6kMG1nBfTeFl8fPmcwLs=w400-h75-no?authuser=0)`,
        background: 'linear-gradient(45deg, #159794 30%, #53b1af 90%)',
        height:'75px',
        width: '400px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    }, 
    multipleChoiceCorrectAnswerImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/v3d5H5kVAW3JEqEcszLFIezk6A2_2AdAT9_a2zHXUysUuLnEWAKNfLA-68LcWBkFTAFvLSOwTa_jJiTArzqAMuZRVTrcA5pYBPsUclV3ovODfSqpJGLTbWDnvf9dCJyn31An0z5jnoPmEpe6vzGjBfisUFmDL0Kf3GAHfwfbvVMrllwxpCu1rFdLacxzoTq2lqTcIgKzUa132NHwJIIEq9Qsm6gGOhVCeTWRhMiyVtyD0Wh2wkFq0FJdnmAHYVYbdtUm8L3tD-tsaM4h6h4Vxn8rnfejRlS75DCXvq_O6H9yM-KbTnjX_av3vmPA4SknD6AELTECOtShUJXiEHVOtSID-NRumxRt_-mv2medd9TyOoCCbpGXixnYlLGnEW7qFLmh2Tidv69zcAsEsVvKtWXKu1z0pi0bdFWhGE9H7CPAXkqmfNgnsyM5wyDyYVPG4dm_6_sokjRWK0SgECrVWHurJ_ra1XlM-rq4xE0rt3ko2-Jv_91n4nWBfWLowYlpIistDBv0I4flH2ndAhwkZGTni6wFCl7p0kSWWrDP-pl0-J_6jHfg1EB5omJEXMuwZWvMtkKT-6imPlPx-csLIus2V2cLDI-TPt4yUqFafRU7uGJQ7BehaRrTpJYPh6PRS4IUT7rKLlSSG1TyvE9EMLQurAEpo4TWLC1dRyylWeJHRh0gdkfM-8BHfjfqPXBua4A6kMG1nBfTeFl8fPmcwLs=w400-h75-no?authuser=0)`,
        background: 'linear-gradient(45deg, #71c1e9 30%, #80ced7 90%)',
        height:'75px',
        width: '400px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
        
    }, 

    ConstructionAnswerImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/v3d5H5kVAW3JEqEcszLFIezk6A2_2AdAT9_a2zHXUysUuLnEWAKNfLA-68LcWBkFTAFvLSOwTa_jJiTArzqAMuZRVTrcA5pYBPsUclV3ovODfSqpJGLTbWDnvf9dCJyn31An0z5jnoPmEpe6vzGjBfisUFmDL0Kf3GAHfwfbvVMrllwxpCu1rFdLacxzoTq2lqTcIgKzUa132NHwJIIEq9Qsm6gGOhVCeTWRhMiyVtyD0Wh2wkFq0FJdnmAHYVYbdtUm8L3tD-tsaM4h6h4Vxn8rnfejRlS75DCXvq_O6H9yM-KbTnjX_av3vmPA4SknD6AELTECOtShUJXiEHVOtSID-NRumxRt_-mv2medd9TyOoCCbpGXixnYlLGnEW7qFLmh2Tidv69zcAsEsVvKtWXKu1z0pi0bdFWhGE9H7CPAXkqmfNgnsyM5wyDyYVPG4dm_6_sokjRWK0SgECrVWHurJ_ra1XlM-rq4xE0rt3ko2-Jv_91n4nWBfWLowYlpIistDBv0I4flH2ndAhwkZGTni6wFCl7p0kSWWrDP-pl0-J_6jHfg1EB5omJEXMuwZWvMtkKT-6imPlPx-csLIus2V2cLDI-TPt4yUqFafRU7uGJQ7BehaRrTpJYPh6PRS4IUT7rKLlSSG1TyvE9EMLQurAEpo4TWLC1dRyylWeJHRh0gdkfM-8BHfjfqPXBua4A6kMG1nBfTeFl8fPmcwLs=w400-h75-no?authuser=0)`,
        background: 'linear-gradient(45deg, #71c1e9 30%, #80ced7 90%)',
        height:'65px',
        width: '65px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px',
        fontSize: 20,
        //fontWeight: 'bold',
        //color: "#FFFFFF"
    },
    ConstructionInputAnswerImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/AcX4isuEYjw_PMMJ5TWu2Wj9D-Rq3mGK44Ktdhpf4TRgnk6GVSctF27yCnnkPQI8mVpsDsYMKIVvgQNgKeRe1RICUA1Adzi5YlqlJboG_gl97gpcN9TIvhV06imWqlTpYP_m76DBr6xN1SvM4x931CW7rwH3bMtxTXWCuiIJpUpRtBy6SWlHRQC5SSA53rbhU-jDeloKOyvFjTyZEX9SaBxw70WPFOWvZGFlZDGquQpLXyW2PMPH-3eYrH0wWlOIhgsUtXmbA0aHmPPg7VE75MrIKIndYMD_3TbzJVwTebh7XCa0j2fqhjn74llQxJMNbkVxYQgTZhcYrrRx0vow-o3bAGzy_Ku2ULQVn8RwvvpaRj6krqx4aE75vXxefX2b9itSiA2ELAzQZfjNWrsvi_UsUanm6b_A3S61mPN8Jcc3LmG8ZXdWyOYgI7Z4Oc6rmRpEr_wbW5P_GFHkw1pCDx_Q8yCbd5U_UBLcWZWqBSQGjp7ADe_6wcN35QzTxwTyihBCCnguUNUvf2OaPEJMxY6-IFggtb0Bjm12AMJtWf7bdV7cAT9yFti5fFMrz4ZQ-KDl2pgKdBCsIt1c_ZZpZn6HEprQfp2snIU5Cx1CBun8ueeqUjV3rVneY7rBa2Pngyln-VPlGo14UsIN8HAnYoNyefxfacgAUe0iptp2cO1RfmCPvBB7yiq0361c8EcjlQQ9DvamqIqWhXNEugeVqOE=w500-h150-no?authuser=0)`,
        background: 'linear-gradient(45deg, #159794 30%, #53b1af 90%)',
        height:'150px',
        width: '500px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        //marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    },
    answerSection:{
        height:'300px',
        marginTop:'10px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black'       
    },
    textBoxContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
    },
    constructionContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
    },
    textBoxTextField:{
        width:"450px"
    },
    tipTextField:{
        width:"300px"
    },
    multipleChoiceTextField:{
        width:"375px"
    },
    answerTextField:{
        width:"450px"
    },
    dummyLettersTextField:{
        width:"450px"
    },
    textBoxImage:{
        //backgroundImage: `url(https://lh3.googleusercontent.com/AcX4isuEYjw_PMMJ5TWu2Wj9D-Rq3mGK44Ktdhpf4TRgnk6GVSctF27yCnnkPQI8mVpsDsYMKIVvgQNgKeRe1RICUA1Adzi5YlqlJboG_gl97gpcN9TIvhV06imWqlTpYP_m76DBr6xN1SvM4x931CW7rwH3bMtxTXWCuiIJpUpRtBy6SWlHRQC5SSA53rbhU-jDeloKOyvFjTyZEX9SaBxw70WPFOWvZGFlZDGquQpLXyW2PMPH-3eYrH0wWlOIhgsUtXmbA0aHmPPg7VE75MrIKIndYMD_3TbzJVwTebh7XCa0j2fqhjn74llQxJMNbkVxYQgTZhcYrrRx0vow-o3bAGzy_Ku2ULQVn8RwvvpaRj6krqx4aE75vXxefX2b9itSiA2ELAzQZfjNWrsvi_UsUanm6b_A3S61mPN8Jcc3LmG8ZXdWyOYgI7Z4Oc6rmRpEr_wbW5P_GFHkw1pCDx_Q8yCbd5U_UBLcWZWqBSQGjp7ADe_6wcN35QzTxwTyihBCCnguUNUvf2OaPEJMxY6-IFggtb0Bjm12AMJtWf7bdV7cAT9yFti5fFMrz4ZQ-KDl2pgKdBCsIt1c_ZZpZn6HEprQfp2snIU5Cx1CBun8ueeqUjV3rVneY7rBa2Pngyln-VPlGo14UsIN8HAnYoNyefxfacgAUe0iptp2cO1RfmCPvBB7yiq0361c8EcjlQQ9DvamqIqWhXNEugeVqOE=w500-h150-no?authuser=0)`,
        background: 'linear-gradient(45deg, #71c1e9 30%, #80ced7 90%)',
        height:'150px',
        width: '500px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    },
    questionTextField:{
        width:"500px"
    },
    score:{
        background: 'linear-gradient(45deg, #71c1e9 30%, #80ced7 90%)',
        height:'250px',
        width: '600px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    },
    modifyStage:{
        height:'150px',
        width: '1200px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    },
    stageIndex:{
        background: 'linear-gradient(45deg, #4dccc6 30%, #96e4df 90%)',
        height:'20px',
        width: '40px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        //marginTop:'10px',
        marginBottom:'10px',
        marginLeft:'10px',
        marginRight:'10px',
        borderRadius: '10px'
    },
    saveChanges:{
        background: 'linear-gradient(45deg, #f9aba4 30%, #e99ba6 90%)',
        height:'30px',
        width: '200px',
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'column',
        //marginTop:'10px',
        //marginBottom:'10px',
        marginLeft:'20px',
        marginRight:'20px',
        borderRadius: '10px'
    },
}))

export default function EditGameStages(props) {
    const classes = useStyles();
    var testQuestions = props.value;
    const id = props.id;


    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [currentQuestion, setCurrentQuestion] = useState(0);

    const [question, setQuestion] = useState(testQuestions[currentQuestion].question);
    const [answer, setAnswer] = useState(testQuestions[currentQuestion].answer);
    const [tip1, setTip1] = useState(testQuestions[currentQuestion].tip1);
    const [tip2, setTip2] = useState(testQuestions[currentQuestion].tip2);
    const [choice1, setChoice1] = useState(testQuestions[currentQuestion].choice1);
    const [choice2, setChoice2] = useState(testQuestions[currentQuestion].choice2);
    const [choice3, setChoice3] = useState(testQuestions[currentQuestion].choice3);
    const [choice4, setChoice4] = useState(testQuestions[currentQuestion].choice4);
    const [choice5, setChoice5] = useState(testQuestions[currentQuestion].choice5);
    const [letters, setLetters] = useState(testQuestions[currentQuestion].letters.map(x => x).join("").substring(testQuestions[currentQuestion].answer.length));

    //const [constructionLetters, setConstructionLetters] = useState(testQuestions[currentQuestion].letters.map(x => x));
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    useEffect(() => {
    }, [currentQuestion]);
    function handleUpdate() {
      forceUpdate();
    }

    const handleSetCurrentStage = (letter, index) => {

        setQuestion(testQuestions[index].question);
        setAnswer(testQuestions[index].answer);
        setTip1(testQuestions[index].tip1);
        setTip2(testQuestions[index].tip2);
        setChoice1(testQuestions[index].choice1);
        setChoice2(testQuestions[index].choice2);
        setChoice3(testQuestions[index].choice3);
        setChoice4(testQuestions[index].choice4);
        setChoice5(testQuestions[index].choice5);
        setLetters(testQuestions[index].letters.map(x => x).join("").substring(testQuestions[index].answer.length));
        
        setCurrentQuestion(index);
	};

    const handleSetMultipleChoice = () => {
        testQuestions[currentQuestion].type = "Multiple Choice";
        handleUpdate();
	};
    const handleSetTextBox = () => {
        testQuestions[currentQuestion].type = "Textbox";
        handleUpdate();
	};
    const handleSetConstruction = () => {
        testQuestions[currentQuestion].type = "Construction";
        handleUpdate();
	};

    const handleAddStage = () => {
        testQuestions.push({
            "type": "Multiple Choice",
            "question": "Please Input a Question",
            "answer": "Please Input the Answer",
            "tip1": "Please Input Tip 1",
            "tip2": "Please Input Tip 2",
            "choice1": "Please Input the Answer",
            "choice2": "Please Input a wrong Answer (1)",
            "choice3": "Please Input a wrong Answer (2)",
            "choice4": "Please Input a wrong Answer (3)",
            "choice5": "Please Input a wrong Answer (4)",
            "letters": [],
          })
          handleSetCurrentStage(null, testQuestions.length - 1);
	};

    const handleDeleteStage = () => {
        if(testQuestions.length > 1){
            testQuestions.splice(currentQuestion, 1);
        }
        
        if(currentQuestion >= testQuestions.length){
            setCurrentQuestion(testQuestions.length - 1);
        }
        else{
            handleUpdate();
        }
	};

    const handleAnswer = (value) => {
        testQuestions[currentQuestion].answer = value;
        setAnswer(value);
	};
    const handleTip1 = (value) => {
        testQuestions[currentQuestion].tip1 = value;
        setTip1(value);
	};
    const handleTip2 = (value) => {
        testQuestions[currentQuestion].tip2 = value;
        setTip2(value);
	};
    const handleQuestion = (value) => {
        testQuestions[currentQuestion].question = value;
        setQuestion(value);
	};
    const handleChoice1 = (value) => {
        testQuestions[currentQuestion].choice1 = value;
        setChoice1(value);
        testQuestions[currentQuestion].answer = value;
        setAnswer(value);
	};
    const handleChoice2 = (value) => {
        testQuestions[currentQuestion].choice2 = value;
        setChoice2(value);
	};
    const handleChoice3 = (value) => {
        testQuestions[currentQuestion].choice3 = value;
        setChoice3(value);
	};
    const handleChoice4 = (value) => {
        testQuestions[currentQuestion].choice4 = value;
        setChoice4(value);
	};
    const handleChoice5 = (value) => {
        testQuestions[currentQuestion].choice5 = value;
        setChoice5(value);
	};
    const handleLetters = (value) => {
        const temp = testQuestions[currentQuestion].answer.split('').concat(value.split(''));
        testQuestions[currentQuestion].letters = temp;
        setLetters(value);
	};
    const handleSaveChanges = () => {
        axios.patch('/games/update/' + id, {nestedStages: testQuestions})
        .then(res => {
          console.log(res)
          if (res.status === 200){
            enqueueSnackbar('Success!!', {variant:'success'});
          }else if (res.status === 400){
            enqueueSnackbar('400 error', {variant:'warning'});
          }else{
            enqueueSnackbar('Hm, something is not right', {variant:'error'});
          }
        })
        .catch(() => {
          enqueueSnackbar('Hm, something is not right', {variant:'error'});
        })
	};
    

	return (
		<div className='app'>
                    <Container className={classes.background}>

                        <Container id='stage' className={classes.stageCount}>
                            <Typography style={{ fontWeight: 'bold', color: '#FFFFFF'}}>
                                Current Stage: {currentQuestion + 1}
                            </Typography>
                            <Typography style={{ fontWeight: 'bold', color: '#FFFFFF'}}>
                                Total Stage(s): {testQuestions.length}
                            </Typography>
                            <Container className={classes.modifyStage}>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                {testQuestions.map((letter, index) => (
                                    <Button className={classes.stageIndex} variant="contained" onClick={() => handleSetCurrentStage(letter, index)} disabled={index === currentQuestion}>{ index + 1 }</Button>
                                ))}
                                </Grid>
                            </Container>
                            <Container className={classes.modifyStage}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    >
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAddStage()} disabled={testQuestions.length > 9} ><AddCircleOutlineOutlinedIcon/>{"Add a Stage"}</Button>
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleDeleteStage()} disabled={testQuestions.length <=1}><HighlightOffOutlinedIcon/>{"Delete Current Stage"}</Button>
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleSaveChanges()}><SaveOutlinedIcon/>{"Save Changes"}</Button>
                                </Grid>
                            </Container>
                            <Container className={classes.modifyStage}>
                                <Typography style={{ fontWeight: 'bold', color: '#FFFFFF'}}>
                                    Current Type: {testQuestions[currentQuestion].type}
                                </Typography>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                    >
                                    
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleSetMultipleChoice()} disabled={testQuestions[currentQuestion].type === "Multiple Choice"}>{"Multiple Choice"}</Button>
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleSetConstruction()}  disabled={testQuestions[currentQuestion].type === "Construction"}>{"Construction"}</Button>
                                    <Button className={classes.saveChanges} style={{textTransform: 'none'}} variant="contained" onClick={() => handleSetTextBox()}  disabled={testQuestions[currentQuestion].type === "Textbox"}>{"Textbox"}</Button>
                                </Grid>
                            </Container>
                        </Container>
                        <Container id='question-section' className={classes.questionSection}>
                            <Container id='question-image' className={classes.questionImage}>
                                <TextField
                                onChange={(e) => handleQuestion(e.target.value)}
                                variant="outlined"
                                required
                                placeholder="Question"
                                value={question}
                                className={classes.questionTextField}
                                multiline
                                rowsMax={2}
                                inputProps={{style: {fontSize: 24, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                />
                            </Container>
                        </Container>
                        
                        {testQuestions[currentQuestion].type === "Textbox"
                        &&
                        <Container id='tip-section' className={classes.tipSection}>
                            <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            >
                            {testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container className={classes.tipExpandedImage}>
                                
                                <TextField
                                onChange={(e) => handleTip1(e.target.value)}
                                variant="outlined"
                                required
                                placeholder="Tip 1"
                                value={tip1}
                                className={classes.tipTextField}
                                inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                />
                            
                            </Container>
                            }
                            
                            {testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container className={classes.tipExpandedImage}>
                                <TextField
                                onChange={(e) => handleTip2(e.target.value)}
                                variant="outlined"
                                required
                                placeholder="Tip 2"
                                value={tip2}
                                className={classes.tipTextField}
                                inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                />
                            </Container>
                            }
                            
                            </Grid>
                        </Container>
                        }

                        <Container id='answer-section' className={classes.answerSection}>
                            {testQuestions[currentQuestion].type === "Multiple Choice"
                            &&
                            <Container id='multiple-choice-section'>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >

                                    <Container className={classes.multipleChoiceCorrectAnswerImage} style={{textTransform: 'none'}}>
                                        <TextField
                                        onChange={(e) => handleChoice1(e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Correct Answer"
                                        value={choice1}
                                        className={classes.multipleChoiceTextField}
                                        inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                        />
                                    </Container>
                                    

                                    <Container className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}}>
                                        <TextField
                                        onChange={(e) => handleChoice2(e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Wrong Answer 1"
                                        value={choice2}
                                        className={classes.multipleChoiceTextField}
                                        inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                        />
                                    </Container>
                                    
                                </Grid>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                <Container className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" >
                                        <TextField
                                        onChange={(e) => handleChoice3(e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Wrong Answer 2"
                                        value={choice3}
                                        className={classes.multipleChoiceTextField}
                                        inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                        />
                                </Container>
                                
                                </Grid>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >

                                    <Container className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" >
                                        <TextField
                                        onChange={(e) => handleChoice4(e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Wrong Answer 3"
                                        value={choice4}
                                        className={classes.multipleChoiceTextField}
                                        inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                        />
                                    </Container>
                                    

                                    <Container className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" >
                                        <TextField
                                        onChange={(e) => handleChoice5(e.target.value)}
                                        variant="outlined"
                                        required
                                        placeholder="Wrong Answer 4"
                                        value={choice5}
                                        className={classes.multipleChoiceTextField}
                                        inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                        />
                                    </Container>
                                    
                                </Grid>
                            </Container>
                            }
                            {(testQuestions[currentQuestion].type === "Textbox" || testQuestions[currentQuestion].type === "Construction" )
                            &&
                            <Container className={classes.textBoxContainer}>
                                <Container className={classes.textBoxImage}>
                                <TextField
                                onChange={(e) => handleAnswer(e.target.value)}
                                variant="outlined"
                                required
                                placeholder="Answer"
                                value={answer}
                                className={classes.textBoxTextField}
                                inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                />
                                </Container>
                            </Container>
                            }
                            {testQuestions[currentQuestion].type === "Construction"
                            &&
                            <Container id='construction-section' className={classes.constructionContainer}>
                                
                                <Container className={classes.ConstructionInputAnswerImage}>
                                    <TextField
                                    onChange={(e) => handleLetters(e.target.value)}
                                    variant="outlined"
                                    required
                                    placeholder="Dummy Letters"
                                    value={letters}
                                    className={classes.textBoxTextField}
                                    inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                    />
                                
                                </Container> 

                            </Container>
                            }

                        </Container>
                    </Container>

		</div>

	);
}