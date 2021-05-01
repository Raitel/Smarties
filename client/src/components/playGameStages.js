import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';

const useStyles = makeStyles((theme) => ({
    background:{
        backgroundImage: `url(https://lh3.googleusercontent.com/5vPj1BZ8f9jV9inMRGy9Ryy_D-zZD0Mojj0u_jxYvM-OJzhCFFFSQgXKTGmwNITIcdsDMFrBHBbZF6k4eZrj7lVlGEpLTIqH1ReEeGr7n0m7-UGZiVFaHoWUuWhukWQFQk4Z-65uSZMrIbUO0t1NdOPx-Utxx2RHGX1Rkyob8xT8h-Gf5qL7NVlRcmlAIAN1WLhNx5MW7dTXFUjyZNGqvsWBwu9Ke-KRxXB45EDffLQ0fqqBU8YhgRZrFc0_nzn5flkY_wJ7H6e0CacbbXUGt5YZxrKrYuLSZR7R4pgwy2sNi1PlPtgi_c5WSHCKD3bPOtrGgqHX5cgGxY_wKkHZKzpxaW_R3GvkbWgJ4WVjLff9DQzmi2modM5oXpYPWMtjjvtGhFXdw3LmIThgsZD5Mk12_5cOQh4ZnVXAp4t_HillSonSmBpjHWZxNf7cafHVKTB8KOcFUsaZ9pQgqS0cwW2WsSYeiaKVXSsMmSFpJyScLAmbFItiAAAAPqyekbAYHzeAWkP5FEgBDo4AQrQW3kCMQ9LxjGe6WSFet6r1S42nlqXFEC7n5E0o3_mOnDiPJjxZ26sFkzjNT7hvYiUvQ6A03HFtZpyr-9aJtqPveetavd5-LKL9zfV0hWQkxMtUZB6jtzxV4ZK7JCz5iYhuKCZGckJqYHvhMRnxIVJJG0Ek1NzmnrJvcW5GgLVTgdz87L6tr1i0u1M2YfxdJKwbTpk=w1200-h800-no?authuser=0)`,
        //background: 'linear-gradient(45deg, #2d3436 30%, #d3d3d3 90%)',
        width:'1200px',
        height:'800px',
        //marginTop:'64px',
        marginLeft:'64px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        border: '1px solid black'
    },
    backgroundScore:{
        backgroundImage: `url(https://lh3.googleusercontent.com/5vPj1BZ8f9jV9inMRGy9Ryy_D-zZD0Mojj0u_jxYvM-OJzhCFFFSQgXKTGmwNITIcdsDMFrBHBbZF6k4eZrj7lVlGEpLTIqH1ReEeGr7n0m7-UGZiVFaHoWUuWhukWQFQk4Z-65uSZMrIbUO0t1NdOPx-Utxx2RHGX1Rkyob8xT8h-Gf5qL7NVlRcmlAIAN1WLhNx5MW7dTXFUjyZNGqvsWBwu9Ke-KRxXB45EDffLQ0fqqBU8YhgRZrFc0_nzn5flkY_wJ7H6e0CacbbXUGt5YZxrKrYuLSZR7R4pgwy2sNi1PlPtgi_c5WSHCKD3bPOtrGgqHX5cgGxY_wKkHZKzpxaW_R3GvkbWgJ4WVjLff9DQzmi2modM5oXpYPWMtjjvtGhFXdw3LmIThgsZD5Mk12_5cOQh4ZnVXAp4t_HillSonSmBpjHWZxNf7cafHVKTB8KOcFUsaZ9pQgqS0cwW2WsSYeiaKVXSsMmSFpJyScLAmbFItiAAAAPqyekbAYHzeAWkP5FEgBDo4AQrQW3kCMQ9LxjGe6WSFet6r1S42nlqXFEC7n5E0o3_mOnDiPJjxZ26sFkzjNT7hvYiUvQ6A03HFtZpyr-9aJtqPveetavd5-LKL9zfV0hWQkxMtUZB6jtzxV4ZK7JCz5iYhuKCZGckJqYHvhMRnxIVJJG0Ek1NzmnrJvcW5GgLVTgdz87L6tr1i0u1M2YfxdJKwbTpk=w1200-h800-no?authuser=0)`,
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
        height:'75px',
        marginBottom:'10px',
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        //border: '1px solid black',
        //boxShadow: '1px 1px'       
    },
    stageImage:{
        backgroundImage: `url(https://lh3.googleusercontent.com/WHJJzNnlPqYc6x0THeH_ICQ1TLsiBH0Rad54GHQS_QM3gXU39XGGPcN193F_cDK0OgAX9l2SCmt0pdKo9DCkvO3sy7w63TYZcyZjg6J35UUyJyTKdFwfx-0xlhnL4uAHYbZuOOhYvl6Og5E5WQooc2dh0KVQqfovs_AvyLGDFZDqOnC8jSL9aT2wA9gKCWO7uF21l6MC6Su-vYj-kAyCJc4D-8JVKrflK0U9gsvi1mHl2ytAT_KO7eTAqb7c2By3a2u10iEsDDcu-QYLnSm87PNXUnIsT5CkqOJvRkonfAfGYxGTAEd3XDc90ClZIm6YZINDKZhsy1PtVFvt0z9Rz0ccB7HNMEfoYDr-xXvHoT6XluA1f6FZI4pSYTr_SA2TKDvaJzepf3cBIQALXskIXNgkKHjs059gby1L20Gi1GSPpprFBT798Uq11TOlgPBpCceBXA5SoPrVsREWO4-brq6b4gogDP3SLvmnw9mjZ04R_TspZDXfz2EjIU9-cVxtjzGM9WyDAM84Y50JgP93jBFdOdkGWdwm7cA_i_uEbn1N1Dxv_MJcHsJF_JuIk8HO0kwPWO8M5Cafphp8zAuWM3nA-unUj7v3yQjHG6FVnFC4H_AES7vC4zFzy6cMTwwJXPHwVSI_T0cvvdChqlXrdax57_DXPtgjMbZAX6Lh4BTDjdQH5XKt9JZ7vJKMNDa1_Vuyz5EuUF987JE6LpMrih4=w325-h75-no?authuser=0)`,
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
        height:'75px',
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
    questionText:{
        width:"450px"
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
}))

export default function PlayGameStages(props) {
    const classes = useStyles();
    const testQuestions = props.value;

    const [progress, setProgress] = useState(0);

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [point, setPoint] = useState(0);
    const [tip1Disabled, setTip1Disabled] = useState(false);
    const [tip2Disabled, setTip2Disabled] = useState(false);
    const [tipConstruction, setTipConstruction] = useState([-1,-1]);

    const [multipleChoiceButtonDisabled, setMultipleChoiceButtonDisabled] = useState([]);
    const [multipleChoice, setMultipleChoice] = useState(shuffle([testQuestions[currentQuestion].choice1,testQuestions[currentQuestion].choice2,testQuestions[currentQuestion].choice3,testQuestions[currentQuestion].choice4,testQuestions[currentQuestion].choice5]));
    //const [multipleChoice, setMultipleChoice] = useState([]);
    const [textboxAnswer, setTextboxAnswer] = useState('');
    const [textboxAnswerError, setTextboxAnswerError] = useState(false)
    
    const [constructionAnswer, setConstructionAnswer] = useState('')
    const [constructionAnswerError, setConstructionAnswerError] = useState(false)
    const [constructionButtonDisabled, setConstructionButtonDisabled] = useState([])
    const [constructionSubmitButtonDisabled, setConstructionSubmitButtonDisabled] = useState(false)
    const [constructionLetters, setConstructionLetters] = useState(shuffle(testQuestions[currentQuestion].letters.map(x => x)));



	const handleAnswerOptionClick = (isCorrect) => {
        if(isCorrect){
            enqueueSnackbar("Good Job! You got the answer correct!", {
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                variant:'success',
                });
        }
        else{
            var message = "Oops, the correct answer was " + testQuestions[currentQuestion].answer;
            enqueueSnackbar(message, {
                anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
                },
                persist: true,
                variant:'error',
                action});            
        }

        handleNextQuestion(isCorrect);
	};

    const action = key => (
            <IconButton onClick={() => { closeSnackbar(key) }}>
                <CloseIcon />
            </IconButton>
    );

	const handleNextQuestion = (isCorrect) => {
		if (isCorrect) {
            var extraPoints = 0;
			setScore(score + 1);
            
            if(tip1Disabled === false){
                extraPoints = extraPoints + 3;
            }
            if(tip2Disabled === false){
                extraPoints = extraPoints + 3;
            }

            setPoint(point + 10 + extraPoints);
		}

		const nextQuestion = currentQuestion + 1;

		if (nextQuestion < testQuestions.length) {
            if (testQuestions[nextQuestion].type === "MultipleChoice") {
                initializeMultipleChoice();
            }
            if (testQuestions[nextQuestion].type === "Construction") {
                initializeConstruction();
            }

			setCurrentQuestion(nextQuestion);
            setTip1Disabled(false);
            setTip2Disabled(false);
            setMultipleChoiceButtonDisabled([]);
            handleResetOptionClick();
            setConstructionAnswerError(false);
            setTextboxAnswerError(false);
            setTextboxAnswer('');
            setTipConstruction([-1,-1]);
            setProgress(Math.floor((100 * nextQuestion)/testQuestions.length));
            
		} else {
            setProgress(Math.floor((100 * nextQuestion)/testQuestions.length));
			setShowScore(true);
		}
	};

	const handleSubmitTextboxOptionClick = (isCorrect) => {
		if (textboxAnswer === "") {
			setTextboxAnswerError(true);
		}
        else{
            handleAnswerOptionClick(isCorrect);
        }
	};

	const handleSubmitConstructionOptionClick = (isCorrect) => {
		if (constructionAnswer === "") {
			setConstructionAnswerError(true);
		}
        else{
            handleAnswerOptionClick(isCorrect);
        }
	};

	const handleResetOptionClick = () => {
        setConstructionAnswer('');
        setConstructionButtonDisabled([]);
        var temp = constructionButtonDisabled;
        for (var i = 0; i < temp.length; i++) {
            temp[i] = false;
        }
        setConstructionAnswerError(false)
        setConstructionButtonDisabled(temp)
        
	};

    const handleAddLetterOptionClick = (letter, index) => {
        setConstructionSubmitButtonDisabled(true);
        setConstructionAnswer(constructionAnswer + letter);
        var temp = constructionButtonDisabled;
        temp[index] = true;
        setConstructionButtonDisabled(temp);
        setConstructionSubmitButtonDisabled(false);
	};
	const handleTip1OptionClick = () => {
        setTip1Disabled(true);
        if (testQuestions[currentQuestion].type === "MultipleChoice") {
            var rand = getRandomInt(5);
            while(multipleChoice[rand] === testQuestions[currentQuestion].answer.toString() || multipleChoiceButtonDisabled[rand] === true){
                rand = getRandomInt(5);
            }
            var temp = multipleChoiceButtonDisabled;
            temp[rand] = true;
            setMultipleChoiceButtonDisabled(temp);
        }
        if (testQuestions[currentQuestion].type === "Construction") {
            var answer = testQuestions[currentQuestion].answer.toString();
            var rand = getRandomInt(answer.length);
            while(tipConstruction[0] === rand || tipConstruction[1] === rand){
                rand = getRandomInt(answer.length);
            }
            var temp = tipConstruction;
            temp[0] = rand;
            setTipConstruction(temp);
        }
	};

	const handleTip2OptionClick = () => {
        setTip2Disabled(true);
        if (testQuestions[currentQuestion].type === "MultipleChoice") {
            var rand = getRandomInt(5);
            while(multipleChoice[rand] === testQuestions[currentQuestion].answer.toString() || multipleChoiceButtonDisabled[rand] === true){
                rand = getRandomInt(5);
            }
            var temp = multipleChoiceButtonDisabled;
            temp[rand] = true;
            setMultipleChoiceButtonDisabled(temp);
        }
        if (testQuestions[currentQuestion].type === "Construction") {
            var answer = testQuestions[currentQuestion].answer.toString();
            var rand = getRandomInt(answer.length);
            while(tipConstruction[0] === rand || tipConstruction[1] === rand){
                rand = getRandomInt(answer.length);
            }
            var temp = tipConstruction;
            temp[1] = rand;
            setTipConstruction(temp);
        }
	};

    const initializeMultipleChoice = () => {
        var temp = []
        temp.push(testQuestions[currentQuestion + 1].choice1);
        temp.push(testQuestions[currentQuestion + 1].choice2);
        temp.push(testQuestions[currentQuestion + 1].choice3);
        temp.push(testQuestions[currentQuestion + 1].choice4);
        temp.push(testQuestions[currentQuestion + 1].choice5);
        shuffle(temp);
        setMultipleChoice(temp);
	};
    const initializeConstruction = () => {
        setConstructionLetters(shuffle(testQuestions[currentQuestion + 1].letters.map(x => x)));
	};

    // const initializeConstructionLetters = () => {
    //     var temp = testQuestions[currentQuestion].letters.map();
    //     shuffle(temp);
    //     setConstructionLetters(temp);
	// };

    //Fisher-Yates (aka Knuth) Shuffle. https://github.com/coolaj86/knuth-shuffle
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
    //get random integer
    function getRandomInt(max) {
    return Math.floor(Math.random() * max);
    }

	return (

		<div className='app'>
            <LinearProgress variant="determinate" value={progress} style={{
                width:'1200px',
                marginTop:'64px',
                marginLeft:'64px',}}/>
			{showScore ? (
				<Container className={classes.backgroundScore}>
                    <Container className={classes.score}>
                        <Typography>
                            You got {score} questions correct out of {testQuestions.length} questions.
                        </Typography>
                        <Typography>
                            You obtained {point} points from completing the game.
                        </Typography>
                    </Container>
				</Container>
			) : (
				<>
                    <Container className={classes.background}>
                        <Typography>
                            Current Obtained Points: {point}.
                        </Typography>
                        <Container id='stage-count' className={classes.stageCount}>
                            <Container id='stage-image' className={classes.stageImage}>
                                <Typography style={{ fontWeight: 'bold'}}>
                                    Stage {currentQuestion + 1} / {testQuestions.length}
                                </Typography>
                            </Container>
                        </Container>
                        <Container id='question-section' className={classes.questionSection}>
                            <Container id='question-image' className={classes.questionImage}>
                                <Typography variant='h5' style={{fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}} >
                                    {testQuestions[currentQuestion].question}
                                </Typography> 
                                </Container>
                        </Container>
                        
                        <Container id='tip-section' className={classes.tipSection}>
                            {testQuestions[currentQuestion].type === "MultipleChoice"
                            && 
                            <Typography style={{fontSize: 12, fontStyle:"italic", textAlign: "center",  verticalAlign: "middle", color: '#EEEEEE'}}>Use a tip card to eliminate a wrong answer card!</Typography>
                            }
                            {testQuestions[currentQuestion].type === "Textbox"
                            && 
                            <Typography style={{fontSize: 12, fontStyle:"italic", textAlign: "center",  verticalAlign: "middle", color: '#EEEEEE'}}>Use a tip card to get a hint!</Typography>
                            }
                            {testQuestions[currentQuestion].type === "Construction"
                            && 
                            <Typography style={{fontSize: 12, fontStyle:"italic", textAlign: "center",  verticalAlign: "middle", color: '#EEEEEE'}}>Use a tip card to get a correct letter!</Typography>
                            }
                            <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            >
                            {!(tip1Disabled && testQuestions[currentQuestion].type === "Textbox")
                            &&
                            <Button variant="contained" onClick={() => handleTip1OptionClick(true)} disabled={tip1Disabled} className={classes.tipImage}>
                                {!(tip1Disabled && testQuestions[currentQuestion].type === "Construction")
                                &&
                                <EmojiObjectsOutlinedIcon/>
                                }
                                {tip1Disabled && testQuestions[currentQuestion].type === "Construction"
                                && 
                                <Typography
                                style={{fontSize: 18,
                                fontWeight: 'bold'}}> {testQuestions[currentQuestion].answer.charAt(tipConstruction[0])}</Typography>
                                }
                            </Button>
                            }
                            {tip1Disabled && testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container className={classes.tipExpandedImage}>
                                <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>{testQuestions[currentQuestion].tip1}</Typography>
                            </Container>
                            }
                            
                            {!(tip2Disabled && testQuestions[currentQuestion].type === "Textbox")
                            &&
                            <Button variant="contained" onClick={() => handleTip2OptionClick(true)} disabled={tip2Disabled} className={classes.tipImage}>
                                {!(tip2Disabled && testQuestions[currentQuestion].type === "Construction")
                                &&
                                <EmojiObjectsOutlinedIcon/>
                                }
                                {tip2Disabled && testQuestions[currentQuestion].type === "Construction"
                                && 
                                <Typography
                                style={{fontSize: 18,
                                fontWeight: 'bold'}}>{testQuestions[currentQuestion].answer.charAt(tipConstruction[1])}</Typography>
                                }
                            </Button>
                            }
                            {tip2Disabled && testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container className={classes.tipExpandedImage}>
                                <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>{testQuestions[currentQuestion].tip2}</Typography>
                            </Container>
                            }
                            
                            </Grid>
                        </Container>

                        <Container id='answer-section' className={classes.answerSection}>
                            {testQuestions[currentQuestion].type === "MultipleChoice"
                            &&
                            <Container id='multiple-choice-section'>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                    {!multipleChoiceButtonDisabled[0]
                                    &&
                                    <Button className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[0] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[0]}>
                                        <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>
                                            {multipleChoice[0]}
                                        </Typography>
                                    </Button>
                                    }
                                    {!multipleChoiceButtonDisabled[1]
                                    &&
                                    <Button className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[1] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[1]}>
                                        <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>
                                            {multipleChoice[1]}
                                        </Typography>
                                    </Button>
                                    }
                                </Grid>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                {!multipleChoiceButtonDisabled[2]
                                &&
                                <Button className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[2] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[2]}>
                                    <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>
                                        {multipleChoice[2]}
                                    </Typography>
                                </Button>
                                }
                                </Grid>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                    {!multipleChoiceButtonDisabled[3]
                                    &&
                                    <Button className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[3] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[3]}>
                                        <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>
                                            {multipleChoice[3]}
                                            </Typography>
                                    </Button>
                                    }
                                    {!multipleChoiceButtonDisabled[4]
                                    &&
                                    <Button className={classes.multipleChoiceAnswerImage} style={{textTransform: 'none'}} variant="contained" onClick={() => handleAnswerOptionClick(multipleChoice[4] === testQuestions[currentQuestion].answer)} disabled={multipleChoiceButtonDisabled[4]}>
                                        <Typography style={{fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}>
                                            {multipleChoice[4]}
                                            </Typography>
                                    </Button>
                                    }
                                </Grid>
                            </Container>
                            }
                            {testQuestions[currentQuestion].type === "Textbox"
                            &&
                            <Container className={classes.textBoxContainer}>
                                <Container className={classes.textBoxImage}>
                                <TextField
                                onChange={(e) => setTextboxAnswer(e.target.value)}
                                error={textboxAnswerError}
                                variant="outlined"
                                required
                                name="textbox-answer"
                                label=""
                                id="textboxAnswer"
                                placeholder="Your Answer"
                                //helperText="Please Enter an Answer."
                                className={classes.textBoxTextField}
                                inputProps={{style: {fontSize: 20, fontWeight: 'bold', textAlign: "center",  verticalAlign: "middle", color: '#FFFFFF'}}}
                                />
                                </Container>
                                <Button variant="contained" style={{
                                marginTop:'20px',
                                marginBottom:'20px',
                                textTransform: 'none',
                                background: 'linear-gradient(45deg, #71c1e9 30%, #71c1e9 90%)'}} onClick={() => handleSubmitTextboxOptionClick(textboxAnswer.valueOf().toLocaleUpperCase('en-US') === testQuestions[currentQuestion].answer.valueOf().toLocaleUpperCase('en-US'))}>{"Submit"}</Button>
                             
                            </Container>
                            }
                            {testQuestions[currentQuestion].type === "Construction"
                            &&
                            <Container id='construction-section' className={classes.constructionContainer}>
                                
                                <Container className={classes.ConstructionInputAnswerImage}>
                                    <Typography style={{fontSize: 18,
                                    fontWeight: 'bold',
                                    color: "#FFFFFF"}}>
                                        {"Input Answer: "}
                                    </Typography>
                                    {constructionAnswerError
                                    &&
                                    <Typography style={{fontSize: 18,
                                    fontWeight: 'bold',
                                    color: "#ec1c24"}}>
                                        {"Please Input an Answer!"}
                                    </Typography>
                                    }
                                    {constructionAnswer==='' && (!constructionAnswerError)
                                    &&
                                    <Typography style={{fontSize: 18,                                    
                                    color: "#FFFFFF"}}>
                                        {"________"}
                                    </Typography>
                                    }
                                    <Typography style={{fontSize: 18,
                                    fontWeight: 'bold',
                                    color: "#FFFFFF",
                                    textDecoration: 'underline'}}>
                                        {constructionAnswer}
                                    </Typography>
                                </Container> 

                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                    <Button style={{
                                    marginLeft:'20px',
                                    marginRight:'20px',
                                    textTransform: 'none',
                                    background: 'linear-gradient(45deg, #71c1e9 30%, #71c1e9 90%)'}}
                                    variant="contained" onClick={() => handleSubmitConstructionOptionClick(constructionAnswer.valueOf() === testQuestions[currentQuestion].answer.valueOf())} disabled={constructionSubmitButtonDisabled}>{"Submit"}</Button>
                                    <Button  style={{
                                    marginLeft:'20px',
                                    marginRight:'20px',
                                    textTransform: 'none',
                                    background: 'linear-gradient(45deg, #71c1e9 30%, #71c1e9 90%)'}}
                                    variant="contained" variant="contained" onClick={() => handleResetOptionClick()} disabled={constructionSubmitButtonDisabled}>{"Reset"}</Button>
                                </Grid>
                                <Container>
                                <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                >
                                {constructionLetters.map((letter, index) => (
                                    <Button className={classes.ConstructionAnswerImage} variant="contained" onClick={() => handleAddLetterOptionClick(letter, index)} disabled={constructionButtonDisabled[index]}>{letter}</Button>
                                ))}
                                </Grid>
                                </Container>
                            </Container>
                            }

                        </Container>
                    </Container>
				</>
			)}
		</div>

	);
}