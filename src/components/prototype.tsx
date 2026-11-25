/** @jsxImportSource react */
import { useCallback, useEffect, useState } from 'react';
import { qwikify$ } from '@builder.io/qwik-react';
import { ReactFlow, Background, Controls, MiniMap, Handle, Position, addEdge, useNodesState, useEdgesState, type Node, type Edge, type NodeProps, type Connection } from '@xyflow/react';

import { pathFor, type Locale } from '../lib/content';

type PageNodeData = { label: string; detail: string; href: string; kind: string; open: string };
type PageNode = Node<PageNodeData, 'page'>;
const STORAGE = 'london-discover.prototype.v1';

function PageCard({ data, selected }: NodeProps<PageNode>) {
  return <div className={`flow-node ${selected ? 'selected' : ''}`}>
    <Handle type="target" position={Position.Top} /><span className="flow-node-kind">{data.kind}</span>
    <h2>{data.label}</h2><p>{data.detail}</p><a className="nodrag" href={data.href} target="_blank" rel="noopener noreferrer">{data.open}</a>
    <Handle type="source" position={Position.Bottom} />
  </div>;
}
const nodeTypes = { page: PageCard };
function makeNodes(locale: Locale): PageNode[] {
  const zh = locale === 'zh-tw';
  const defs: [string,string,string,string,number,number][] = [
    ['home', zh?'城市指南':'City guide', zh?'首頁與主要入口':'Home and main navigation', '', 340, 0],
    ['visit', zh?'倫敦介紹':'The Thames', zh?'河岸介紹與塔橋故事':'River introduction and bridge history', '#visit', 0, 250],
    ['places', zh?'四個地標':'Four places', zh?'官方景點資訊':'Links to official visitor information', '#places', 280, 250],
    ['neighbourhoods', zh?'諾丁丘':'Notting Hill', zh?'街區介紹與地圖':'Neighbourhood story and map', '#neighbourhoods', 560, 250],
    ['walk', zh?'散步路線':'Walking route', zh?'四站路線與儲存進度':'Four stops and saved progress', 'walk/', 840, 250],
    ['bridge', zh?'3D 塔橋':'3D Tower Bridge', zh?'旋轉模型／照片備援':'Orbit model / photograph fallback', 'bridge/', 0, 500],
    ['credits', zh?'來源與授權':'Credits & sources', zh?'攝影授權與官方連結':'Photography licenses and official links', 'credits/', 280, 500],
    ['language', zh?'English 版本':'繁體中文版本', zh?'保留目前頁面的語系切換':'Same page, another language', '@language', 840, 500],
  ];
  return defs.map(([id,label,detail,page,x,y])=>({id, type:'page',position:{x,y},data:{label,detail,href: page === '@language' ? pathFor(zh?'en':'zh-tw') : pathFor(locale,page),kind:page.startsWith('#')?(zh?'首頁區塊':'Home section'):(zh?'頁面':'Page'),open:zh?'開啟頁面':'Open page'}}));
}
const initialEdges: Edge[] = [['home','visit'],['home','places'],['home','neighbourhoods'],['home','walk'],['visit','bridge'],['places','credits'],['home','language'],['walk','language']].map(([source,target])=>({id:`${source}-${target}`,source,target,type:'smoothstep'}));

function Prototype({locale}: {locale:Locale}) {
  const zh=locale==='zh-tw';
  const [nodes,setNodes,onNodesChange]=useNodesState<PageNode>(makeNodes(locale));
  const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);
  const [ready,setReady]=useState(false);
  const [status,setStatus]=useState(zh?'拖曳節點，編排路徑':'Drag nodes to arrange paths');
  useEffect(()=>{
    try { const saved=JSON.parse(localStorage.getItem(STORAGE)||'null');
      if(saved?.version===1 && Array.isArray(saved.positions) && Array.isArray(saved.edges)) {
        setNodes(makeNodes(locale).map(n=>{const p=saved.positions.find((p:{id:string})=>p.id===n.id);return p&&Number.isFinite(p.x)&&Number.isFinite(p.y)?{...n,position:{x:p.x,y:p.y}}:n;}));
        const ids = new Set(makeNodes(locale).map(n=>n.id));
        setEdges(saved.edges.filter((e:Edge)=>typeof e.id==='string'&&ids.has(e.source)&&ids.has(e.target)).map((e:Edge)=>({id:e.id,source:e.source,target:e.target,type:'smoothstep'})));
      }
    } catch { setStatus(zh?'無法讀取已儲存的排列':'Saved layout could not be read'); }
    setReady(true);
  },[locale,setNodes,setEdges,zh]);
  const onConnect=useCallback((connection:Connection)=>setEdges(es=>addEdge({...connection,type:'smoothstep'},es)),[setEdges]);
  const save=()=>{try { localStorage.setItem(STORAGE,JSON.stringify({version:1,positions:nodes.map(({id,position})=>({id,...position})),edges:edges.map(({id,source,target})=>({id,source,target}))}));setStatus(zh?'排列已儲存在這台裝置':'Layout saved on this device');}catch{setStatus(zh?'此瀏覽器無法儲存，請匯出 JSON':'Storage unavailable. Export the JSON instead.');}};
  const reset=()=>{setNodes(makeNodes(locale));setEdges(initialEdges);try{localStorage.removeItem(STORAGE);}catch{}setStatus(zh?'已還原原始路徑':'Original paths restored');};
  const exportGraph=()=>{const blob=new Blob([JSON.stringify({version:1,locale,nodes,edges},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='london-website-path.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus(zh?'已匯出路徑 JSON':'Path JSON exported');};
  return <div className="prototype-shell">
    <div className="prototype-toolbar"><button onClick={save}>{zh?'儲存排列':'Save layout'}</button><button onClick={reset}>{zh?'還原路徑':'Reset paths'}</button><button onClick={exportGraph}>{zh?'匯出 JSON':'Export JSON'}</button><span className="prototype-status" role="status">{status}</span></div>
    <div className="flow-canvas">{ready && <ReactFlow className="light" nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView fitViewOptions={{padding:'10%'}} onInit={flow=>{document.fonts.ready.then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>flow.fitView({padding:'10%'}))));}} minZoom={.2} maxZoom={1.5} deleteKeyCode={['Backspace','Delete']} defaultEdgeOptions={{style:{stroke:'#937657',strokeWidth:1.6}}}><Background color="#c7bcad" gap={24}/><Controls /><MiniMap position="top-right" pannable zoomable nodeColor="#cbbba4" maskColor="#eee8deaa" /></ReactFlow>}</div>
  </div>;
}
export const QPrototype = qwikify$(Prototype, { eagerness:'visible' });
