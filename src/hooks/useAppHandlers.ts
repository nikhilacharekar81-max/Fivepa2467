import { useState, useEffect, useMemo } from 'react';
import { 
  UserAccount, Gig, Project, Proposal, Order, Dispute, Refund, Payout, 
  Category, SupportTicket, AuditLog, Message, Review, GigExtra, AppNotification 
} from '../types';
import { WorkstreamFilter, WorkstreamItem, SharedFileItem } from '../components/workstream';
import { initialUsers, initialGigs, initialProjects, initialOrders } from '../data/mockData';
import * as DatabaseService from '../services/DatabaseService';
import { useEscrowReviews } from '../useEscrowReviews';

export function useAppHandlers() {
  const [path, setPath] = useState<string>(window.location.pathname || '/');
  const [impersonatedUser, setImpersonatedUser] = useState<UserAccount | null>(null);

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const cached = localStorage.getItem('current_user') || localStorage.getItem('user');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && (parsed.id === 'user_1' || parsed.id === 'user_2' || parsed.id === 'user_3' || parsed.id === 'user_4')) {
          localStorage.removeItem('current_user');
          localStorage.removeItem('user');
          localStorage.removeItem('workperhour_token');
          localStorage.removeItem('token');
          return null;
        }
        return parsed;
      }
    } catch (e) {}
    return null;
  });

  const updateCurrentUser = (u: UserAccount | null | ((prev: UserAccount | null) => UserAccount | null)) => {
    setCurrentUser(prev => {
      const next = typeof u === 'function' ? u(prev) : u;
      if (next) {
        localStorage.setItem('current_user', JSON.stringify(next));
      } else {
        localStorage.removeItem('current_user');
        localStorage.removeItem('user');
      }
      return next;
    });
  };

  const toggleAvailableNow = () => {
    if (!currentUser) return;
    const updated = { ...currentUser, isAvailableNow: !currentUser.isAvailableNow };
    updateCurrentUser(updated);
    alert(updated.isAvailableNow ? 'You are now marked as Available Now! Clients will see your green status.' : 'You are now marked as Unavailable.');
  };

  const [usersList, setUsersList] = useState<UserAccount[]>(initialUsers);
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  
  useEffect(() => {
    if (DatabaseService.Users && DatabaseService.Users.length > 0) {
      setUsersList(DatabaseService.Users);
    }
    if (DatabaseService.Gigs && DatabaseService.Gigs.length > 0) {
      setGigs(DatabaseService.Gigs);
    }
  }, []);

  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [serviceOptionFilter, setServiceOptionFilter] = useState<string>('All');
  const [sellerLevelFilter, setSellerLevelFilter] = useState<string>('All');
  const [budgetFilter, setBudgetFilter] = useState<string>('All');
  const [deliveryTimeFilter, setDeliveryTimeFilter] = useState<number | null>(null);
  const [proServicesOnly, setProServicesOnly] = useState<boolean>(false);
  const [onlineNowOnly, setOnlineNowOnly] = useState<boolean>(false);

  // Proposal & Creation states
  const [proposalBid, setProposalBid] = useState('');
  const [proposalDays, setProposalDays] = useState('');
  const [proposalCover, setProposalCover] = useState('');
  const [isGeneratingAIProposal, setIsGeneratingAIProposal] = useState(false);

  const [newGigTitle, setNewGigTitle] = useState('');
  const [newGigCat, setNewGigCat] = useState('Development & IT');
  const [newGigDesc, setNewGigDesc] = useState('');
  const [newGigPrice, setNewGigPrice] = useState(450);
  const [newGigDays, setNewGigDays] = useState(5);
  const [newGigImage, setNewGigImage] = useState('');
  const [isOptimizingGig, setIsOptimizingGig] = useState(false);
  const [newGigExtras, setNewGigExtras] = useState<GigExtra[]>([]);
  const [extraTitleInput, setExtraTitleInput] = useState('');
  const [extraPriceInput, setExtraPriceInput] = useState(50);

  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjCat, setNewProjCat] = useState('Development & IT');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjMin, setNewProjMin] = useState(500);
  const [newProjMax, setNewProjMax] = useState(2000);

  // Active chat order selection
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageText, setNewMessageText] = useState('');

  const { reviews, setReviews, handleReleaseEscrow } = useEscrowReviews({
    selectedOrder,
    setOrders,
    setSelectedOrder,
    setMessages
  });

  const [workstreamTab, setWorkstreamTab] = useState<WorkstreamFilter>('all');
  const [activeWorkstreamSubTab, setActiveWorkstreamSubTab] = useState<'activity' | 'files'>('activity');
  const [workstreamSearch, setWorkstreamSearch] = useState('');
  const [peopleSearch, setPeopleSearch] = useState('');
  const [projectFilterSearch, setProjectFilterSearch] = useState('');
  const [starredWorkstreams, setStarredWorkstreams] = useState<string[]>([]);
  const [selectedPersonFilter, setSelectedPersonFilter] = useState<string | null>(null);
  const [isStartWorkstreamModalOpen, setIsStartWorkstreamModalOpen] = useState(false);
  const [profileTab, setProfileTab] = useState<'gigs' | 'portfolio' | 'reviews' | 'endorsements'>('gigs');

  // Slug & URL Helpers
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const getGigUrl = (gig: Gig) => {
    const uname = (gig.freelancerUsername || slugify(gig.freelancerName)).toLowerCase();
    const gslug = (gig.slug || slugify(gig.title)).toLowerCase();
    return `/${uname}/${gslug}`;
  };

  const getProjectUrl = (project: Project) => {
    const pslug = (project.slug || slugify(project.title)).toLowerCase();
    return `/project/${pslug}`;
  };

  const handleAddGigExtra = () => {
    if (!extraTitleInput.trim() || extraPriceInput <= 0) return;
    setNewGigExtras(prev => [
      ...prev,
      { id: 'ext_' + Date.now(), title: extraTitleInput.trim(), price: Number(extraPriceInput) }
    ]);
    setExtraTitleInput('');
    setExtraPriceInput(50);
  };

  const handleRemoveGigExtra = (id: string) => {
    setNewGigExtras(prev => prev.filter(e => e.id !== id));
  };

  const navigate = (to: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    window.history.pushState({}, '', to);
    setPath(to);
    window.scrollTo(0, 0);
  };

  const hydratedWorkstreamItems: WorkstreamItem[] = useMemo(() => {
    const activeUid = impersonatedUser ? impersonatedUser.id : currentUser?.id;
    const relevantOrders = activeUid 
      ? orders.filter(o => o.buyerId === activeUid || o.sellerId === activeUid || currentUser?.role === 'super_admin' || currentUser?.role === 'admin')
      : orders;

    return relevantOrders.map(o => {
      const seller = usersList.find(u => u.id === o.sellerId);
      const buyer = usersList.find(u => u.id === o.buyerId);
      const gig = gigs.find(g => g.id === o.gigId);
      const lastMsg = messages.filter(m => m.orderId === o.id).slice(-1)[0];
      return {
        ...o,
        seller,
        buyer,
        gig,
        lastMessage: lastMsg ? lastMsg.text : undefined,
        lastMessageTime: lastMsg ? lastMsg.timestamp : undefined
      };
    });
  }, [orders, usersList, gigs, messages, currentUser, impersonatedUser]);

  const filteredWorkstreamItems = useMemo(() => {
    return hydratedWorkstreamItems.filter(w => {
      if (workstreamTab === 'inbox' && !['funded_in_escrow', 'in_progress'].includes(w.status)) return false;
      if (workstreamTab === 'discussion' && w.status !== 'in_progress') return false;
      if (workstreamTab === 'in_progress' && w.status !== 'in_progress') return false;
      if (workstreamTab === 'delivered' && w.status !== 'delivered') return false;
      if (workstreamTab === 'completed' && w.status !== 'completed') return false;
      if (workstreamTab === 'starred' && !starredWorkstreams.includes(w.id)) return false;
      if (workstreamTab === 'escrow' && (w.amount <= 0 || w.status === 'cancelled')) return false;
      if (workstreamTab === 'archived' && w.status !== 'cancelled') return false;
      if (selectedPersonFilter && w.sellerId !== selectedPersonFilter && w.buyerId !== selectedPersonFilter) return false;
      if (projectFilterSearch && !w.title.toLowerCase().includes(projectFilterSearch.toLowerCase())) return false;
      if (workstreamSearch) {
        const q = workstreamSearch.toLowerCase();
        const matchesTitle = w.title.toLowerCase().includes(q);
        const matchesId = w.id.toLowerCase().includes(q);
        const matchesSeller = w.seller?.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesId && !matchesSeller) return false;
      }
      return true;
    });
  }, [hydratedWorkstreamItems, workstreamTab, starredWorkstreams, selectedPersonFilter, projectFilterSearch, workstreamSearch]);

  const activeSharedFiles: SharedFileItem[] = useMemo(() => {
    if (!selectedOrder) return [];
    return messages
      .filter(m => m.orderId === selectedOrder.id && (m.type === 'file' || m.fileInfo))
      .map(m => ({
        id: m.id,
        name: m.fileInfo?.name || 'attachment.pdf',
        size: m.fileInfo?.size || '1.0 MB',
        url: m.fileInfo?.url || '#',
        uploadedAt: m.timestamp,
        uploadedBy: m.senderName
      }));
  }, [selectedOrder, messages]);

  const handleDeliverWork = (delivery: { notes: string; files: Array<{ name: string; size: string; url: string }> }) => {
    if (!selectedOrder) return;
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: 'delivered' } : o));
    setSelectedOrder(prev => prev ? { ...prev, status: 'delivered' } : null);

    const sysMsg: Message = {
      id: `msg_${Date.now()}`,
      orderId: selectedOrder.id,
      senderId: 'system',
      senderName: 'WorkSphere Deliveries',
      text: `📦 Deliverables submitted for review: "${delivery.notes}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  const handleRequestRevision = (reason: string) => {
    if (!selectedOrder) return;
    setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: 'revision' } : o));
    setSelectedOrder(prev => prev ? { ...prev, status: 'revision' } : null);

    const sysMsg: Message = {
      id: `msg_${Date.now()}`,
      orderId: selectedOrder.id,
      senderId: 'system',
      senderName: 'WorkSphere Quality Control',
      text: `🔄 Revision requested: "${reason}"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'system'
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessageText.trim() || !selectedOrder) return;
    const activeUid = impersonatedUser ? impersonatedUser.id : (currentUser ? currentUser.id : 'u_current');
    const activeName = impersonatedUser ? impersonatedUser.name : (currentUser ? currentUser.name : 'You');
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      orderId: selectedOrder.id,
      senderId: activeUid,
      senderName: activeName,
      text: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'message'
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessageText('');
  };

  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const triggerMissedCallNotification = (senderUsername: string, projectTitle: string, targetWorkstreamId: string) => {
    const newNotification: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser?.id || 'unknown',
      type: 'missed_call',
      title: 'Missed Call',
      message: `Missed video call from ${senderUsername} regarding ${projectTitle}.`,
      senderUsername,
      projectTitle,
      targetWorkstreamId,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleNotificationClick = (notification: AppNotification) => {
    if (notification.type === 'missed_call' && notification.targetWorkstreamId) {
      setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n));
      const order = orders.find(o => o.id === notification.targetWorkstreamId);
      if (order) {
        setSelectedOrder(order);
        navigate(`/messages/${order.id}`);
      }
    }
  };

  return {
    path, setPath,
    impersonatedUser, setImpersonatedUser,
    currentUser, setCurrentUser, updateCurrentUser, toggleAvailableNow,
    notifications, setNotifications, triggerMissedCallNotification, handleNotificationClick,
    usersList, setUsersList,
    gigs, setGigs,
    projects, setProjects,
    proposals, setProposals,
    orders, setOrders,
    disputes, setDisputes,
    refunds, setRefunds,
    payouts, setPayouts,
    categories, setCategories,
    supportTickets, setSupportTickets,
    auditLogs, setAuditLogs,
    searchQuery, setSearchQuery,
    activeDropdown, setActiveDropdown,
    serviceOptionFilter, setServiceOptionFilter,
    sellerLevelFilter, setSellerLevelFilter,
    budgetFilter, setBudgetFilter,
    deliveryTimeFilter, setDeliveryTimeFilter,
    proServicesOnly, setProServicesOnly,
    onlineNowOnly, setOnlineNowOnly,
    proposalBid, setProposalBid,
    proposalDays, setProposalDays,
    proposalCover, setProposalCover,
    isGeneratingAIProposal, setIsGeneratingAIProposal,
    newGigTitle, setNewGigTitle,
    newGigCat, setNewGigCat,
    newGigDesc, setNewGigDesc,
    newGigPrice, setNewGigPrice,
    newGigDays, setNewGigDays,
    newGigImage, setNewGigImage,
    isOptimizingGig, setIsOptimizingGig,
    newGigExtras, setNewGigExtras,
    extraTitleInput, setExtraTitleInput,
    extraPriceInput, setExtraPriceInput,
    handleAddGigExtra, handleRemoveGigExtra,
    newProjTitle, setNewProjTitle,
    newProjCat, setNewProjCat,
    newProjDesc, setNewProjDesc,
    newProjMin, setNewProjMin,
    newProjMax, setNewProjMax,
    selectedOrder, setSelectedOrder,
    messages, setMessages,
    newMessageText, setNewMessageText,
    reviews, setReviews,
    handleReleaseEscrow,
    workstreamTab, setWorkstreamTab,
    activeWorkstreamSubTab, setActiveWorkstreamSubTab,
    workstreamSearch, setWorkstreamSearch,
    peopleSearch, setPeopleSearch,
    projectFilterSearch, setProjectFilterSearch,
    starredWorkstreams, setStarredWorkstreams,
    selectedPersonFilter, setSelectedPersonFilter,
    isStartWorkstreamModalOpen, setIsStartWorkstreamModalOpen,
    profileTab, setProfileTab,
    slugify, getGigUrl, getProjectUrl, navigate,
    hydratedWorkstreamItems,
    filteredWorkstreamItems,
    activeSharedFiles,
    handleDeliverWork,
    handleRequestRevision,
    handleSendMessage
  };
}
