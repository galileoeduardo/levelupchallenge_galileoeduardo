import React, {useState, useRef} from 'react';
import api from '../../service/api';
import { FaTimes } from 'react-icons/fa';
import './style.css';

const BuscarCEP = () => {

    const [cepin,setCepin] = useState('');
    const [logradouro,setLogradouro] = useState('');
    const [bairro,setBairro] = useState('');
    const [localidade,setLocalidade] = useState('');
    const [uf,setUf] = useState('');
    const [cep,setCep] = useState('');
    const [queryMap,setQueryMap] = useState('');
    const [showmap,setShowmap] = useState(false);

    const inputCepin = useRef(null);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api.get(`http://viacep.com.br/ws/${cepin}/json/`).then(response => {
                
                setLogradouro(response.data.logradouro);
                setBairro(response.data.bairro);
                setLocalidade(response.data.localidade);
                setUf(response.data.uf);
                setCep(response.data.cep);

                let url = "https://maps.google.com/maps?";
                url += `q=${response.data.logradouro.replace(" ","%20")}, ${response.data.localidade.replace(" ","%20")} - ${response.data.uf}`;
                url += "&t=&z=13&ie=UTF8&iwloc=&output=embed";
                console.log(url);
                setQueryMap(url);

                setShowmap(true);
                
            });
        } catch (error) {
            alert("Não foi possível obter o endereço para o CEP especificado.");
        }
        
    }

    function clearView() {
        setCepin('');
        setLogradouro('');
        setBairro('');
        setLocalidade('');
        setUf('');
        setCep('');
        setShowmap(false);
        inputCepin.current.focus();
    }

    return (
        <article className="bcep-container">

            <div className="bcep-form">
                <h1>digite um cep</h1>
                <p>Digite abaixo para consultar um  Código de Endereçamento Postal (CEP) do Brasil</p>

                <form onSubmit={handleSubmit}>
                    <input placeholder="Cep" value={cepin} onChange={e => setCepin(e.target.value)} disabled={showmap} ref={inputCepin} />
                    <button type="submit" disabled={showmap} >Buscar</button>
                </form>

            </div>
            
            <div className="bcep-view">
                { showmap &&
                <div className="container">
                    <FaTimes onClick={() => clearView()} size="30" style={{position:"absolute", top:20, right:20, cursor: "pointer", color:"#3c3c3c"}} />
                    <h1>{logradouro}</h1>
                    <p>
                        {bairro}<br/>
                        {localidade} - {uf}<br />
                        {cep}
                    </p>
                    
                    <div className="mapouter">
                        <div className="gmap_canvas">
                            <iframe 
                                id="gmap_canvas" 
                                src={queryMap}
                                frameborder="0"
                                title="google-maps"
                                style={{
                                    width:"100%",
                                    height:300,
                                    scrolling:"no",
                                    margin:0
                                }}
                            ></iframe>
                        </div>
                        <button type="button" onClick={() => clearView()}>Fazer outra busca</button>
                    </div>
                </div>
                }
            </div>

        </article>
    );
};

export default BuscarCEP;