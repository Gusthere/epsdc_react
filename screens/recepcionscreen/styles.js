import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  filtrosRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
    justifyContent: 'flex-start',
  },
  filtroItem: { minWidth: 120, marginRight: 8, marginBottom: 8 },
  filtroItemRow: {
    flex: 1,
    marginRight: 8,
    minWidth: 90,
  },
  filtroLabel: { fontWeight: 'bold', fontSize: 12 },
  picker: { height: 40, width: '100%' },
  pickerRow: {
    height: 40,
    width: '100%',
    backgroundColor: '#f8f8f8',
    borderRadius: 4,
  },
  dateBtn: { borderWidth: 1, borderColor: '#ccc', padding: 6, borderRadius: 4, backgroundColor: '#f8f8f8', marginTop: 2 },
  pdfBtn: { backgroundColor: '#ff4343', padding: 8, borderRadius: 5, marginLeft: 8 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ff4343',
    padding: 6,
    borderRadius: 4,
    marginBottom: 2,
  },
  th: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 6,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  td: {
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontSize: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginVertical: 2,
    backgroundColor: '#ff4343',
  },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  estadoBadge: {
    backgroundColor: '#ff914d',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  estadoBadgeText: { color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' },
  modalContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%'
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10 },
  label: { marginTop: 10 },
  imageBtn: {
    backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 10
  },
  imagePreview: { width: 200, height: 200, marginTop: 10, alignSelf: 'center' },
  registrarBtn: {
    backgroundColor: '#007bff', padding: 10, marginTop: 10, borderRadius: 5,
    alignItems: 'center'
  },
});